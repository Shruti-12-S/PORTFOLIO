import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiArrowUpRight,
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineEnvelope,
  HiOutlinePaperAirplane,
  HiOutlineSignal,
} from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import { profile } from '../data/profile';

function ConnectionConsole() {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setFeedback('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'The message could not be sent.');
      }

      form.reset();
      setStatus('success');
      setFeedback(result.message);
    } catch (error) {
      setStatus('error');
      setFeedback(error.message);
    }
  };

  return (
    <section className="section-wrap connection-section" id="contact">
      <SectionHeader
        index="07"
        eyebrow="CONTACT"
        title="Contact me"
        description="Hiring for a MERN Stack Developer, AI/ML Engineer, or Data Scientist? I would be glad to discuss how I can contribute."
      />

      <motion.div
        className="connection-console"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="connection-sidebar">
          <div>
            <span className="connection-pulse"><i /></span>
            <p className="micro-label">CURRENT STATUS</p>
            <h3>Open to opportunities.</h3>
            <p>Interested in full-time roles, internships, and product-focused engineering teams.</p>
          </div>
          <div className="response-spec">
            <span><b>01</b> Average response <strong>&lt; 24 hours</strong></span>
            <span><b>02</b> Preferred format <strong>Clear + curious</strong></span>
            <span><b>03</b> Availability <strong>Open</strong></span>
          </div>
          <div className="connection-ports">
            <p className="micro-label">FIND ME ONLINE</p>
            <a href="https://www.linkedin.com/in/shruti-shinde-p12?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bm2X%2BoGY2TeOMcfHk3epyQQ%3D%3D"><FaLinkedinIn /> LinkedIn <HiArrowUpRight /></a>
            <a href="https://github.com/shruti-12-S"><FaGithub /> GitHub <HiArrowUpRight /></a>
            <a href={`mailto:${profile.email}`}><HiOutlineEnvelope /> Email <HiArrowUpRight /></a>
          </div>
        </div>

        <form className="connection-form" onSubmit={submit}>
          <div className="form-topline">
            <span><HiOutlineSignal /> SEND A MESSAGE</span>
            <span>FORM / {status === 'sending' ? 'SENDING' : 'READY'}</span>
          </div>
          <label>
            <span>YOUR NAME</span>
            <input required name="name" type="text" minLength="2" maxLength="80" placeholder="Enter your name" />
          </label>
          <label>
            <span>YOUR EMAIL</span>
            <input required name="email" type="email" maxLength="254" placeholder="you@company.com" />
          </label>
          <label>
            <span>WHAT WOULD YOU LIKE TO DISCUSS?</span>
            <select name="topic" defaultValue="Opportunity">
              <option>Opportunity</option>
              <option>Project collaboration</option>
              <option>Technical conversation</option>
              <option>Something interesting</option>
            </select>
          </label>
          <label>
            <span>YOUR MESSAGE</span>
            <textarea required name="message" minLength="10" maxLength="3000" rows="5" placeholder="Tell me about the role, project, or idea..." />
          </label>
          <label className="contact-honeypot" aria-hidden="true">
            <span>WEBSITE</span>
            <input name="website" type="text" tabIndex="-1" autoComplete="off" />
          </label>
          <button className="primary-button submit-button" type="submit" disabled={status === 'sending'}>
            {status === 'sending'
              ? <><HiOutlineSignal /> Sending message...</>
              : <><HiOutlinePaperAirplane /> Send message</>}
          </button>
          {feedback && (
            <p className={status === 'success' ? 'form-success' : 'form-error'} aria-live="polite">
              {status === 'success' ? <HiCheckCircle /> : <HiExclamationCircle />}
              {feedback}
              {status === 'error' && <> You can also email <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

export default ConnectionConsole;
