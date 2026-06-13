import { handleContactSubmission } from '../server/contact.js';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const result = await handleContactSubmission(request.body);
  return response.status(result.status).json(result.body);
}
