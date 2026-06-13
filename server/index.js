import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleContactSubmission } from './contact.js';

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use((_request, response, next) => {
  response.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "font-src 'self' data:",
  ].join('; '));
  response.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');

  if (isProduction) {
    response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
});
app.use(express.json({ limit: '20kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again in 15 minutes.' },
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'shruti-portfolio' });
});

app.post('/api/contact', contactLimiter, async (request, response) => {
  const result = await handleContactSubmission(request.body);
  return response.status(result.status).json(result.body);
});

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API endpoint not found.' });
});

if (existsSync(distPath)) {
  app.use('/assets', express.static(path.join(distPath, 'assets'), {
    immutable: true,
    maxAge: '1y',
  }));
  app.use(express.static(distPath, {
    maxAge: '1h',
    setHeaders: (response, filePath) => {
      if (path.basename(filePath) === 'index.html') {
        response.setHeader('Cache-Control', 'no-cache');
      }
    },
  }));
  app.use((request, response) => {
    if (request.method !== 'GET') {
      return response.status(404).json({ error: 'Route not found.' });
    }

    return response.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.use((_request, response) => {
    response.status(503).json({ error: 'Frontend build is unavailable. Run npm run build.' });
  });
}

app.use((error, _request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error?.type === 'entity.parse.failed') {
    return response.status(400).json({ error: 'Request body must contain valid JSON.' });
  }

  console.error('Unhandled server error:', error);
  return response.status(500).json({ error: 'An unexpected server error occurred.' });
});

if (isProduction) {
  const requiredEnvironmentVariables = ['SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL'];
  const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (key) => !process.env[key],
  );

  if (missingEnvironmentVariables.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missingEnvironmentVariables.join(', ')}`,
    );
  }

  if (!existsSync(distPath)) {
    throw new Error('The production frontend build is missing. Run npm run build before npm start.');
  }
}

const server = app.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Closing the portfolio server.`);

  server.close((error) => {
    if (error) {
      console.error('Server shutdown failed:', error);
      process.exitCode = 1;
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
