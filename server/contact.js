import nodemailer from 'nodemailer';

const recipientEmail = process.env.CONTACT_TO_EMAIL || 'shruti21.shinde@gmail.com';
const allowedTopics = new Set([
  'Opportunity',
  'Project collaboration',
  'Technical conversation',
  'Something interesting',
]);

const normalize = (value) => (typeof value === 'string' ? value.trim() : '');
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP_USER and SMTP_PASS must be configured.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user, pass },
  });
}

export async function handleContactSubmission(body = {}) {
  const name = normalize(body?.name);
  const email = normalize(body?.email).toLowerCase();
  const topic = normalize(body?.topic);
  const message = normalize(body?.message);
  const website = normalize(body?.website);

  // Silently accept bots that fill the hidden honeypot field.
  if (website) {
    return { status: 200, body: { message: 'Message sent successfully.' } };
  }

  if (
    name.length < 2
    || name.length > 80
    || !isEmail(email)
    || email.length > 254
    || !allowedTopics.has(topic)
    || message.length < 10
    || message.length > 3000
  ) {
    return {
      status: 400,
      body: {
        error: 'Please check your details and enter a message between 10 and 3000 characters.',
      },
    };
  }

  try {
    const transporter = getTransporter();
    const safeName = name.replace(/[\r\n]+/g, ' ');

    await transporter.sendMail({
      from: `"Shruti Shinde Portfolio" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: { name: safeName, address: email },
      subject: `[Portfolio] ${topic} from ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        '',
        message,
      ].join('\n'),
    });

    return { status: 200, body: { message: 'Message sent successfully.' } };
  } catch (error) {
    console.error('Contact email failed:', error.message);
    return {
      status: 500,
      body: {
        error: 'The message could not be sent right now. Please email Shruti directly.',
      },
    };
  }
}
