import { motion } from 'framer-motion';
import { HiOutlineCpuChip, HiOutlineMapPin, HiOutlineSparkles } from 'react-icons/hi2';
import SectionHeader from './SectionHeader';
import { profile } from '../data/profile';

function IdentityCard() {
  return (
    <section className="section-wrap identity-section" id="identity">
      <SectionHeader
        index="06"
        eyebrow="ABOUT ME"
        title="About Shruti"
        description="B.Tech Information Technology student, graduating in 2027 focused on dependable software, useful AI, and continuous improvement."
      />

      <motion.div
        className="identity-console"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="identity-primary">
          <div className="identity-introduction">
            <span className="micro-label">INTRODUCTION</span>
            <h3>{profile.name}</h3>
            <p className="identity-role">{profile.role}</p>
            <p>{profile.summary}</p>
          </div>
          <div className="identity-manifesto">
            <span className="micro-label">WHAT I VALUE</span>
            <blockquote>
              Clear communication, thoughtful implementation, and software that solves a real
              user problem.
            </blockquote>
            <div className="manifesto-tags">
              <span>Product-minded</span>
              <span>Data-curious</span>
              <span>Always iterating</span>
            </div>
          </div>
        </div>

        <div className="identity-profile">
          <div className="portrait-module">
            <span className="portrait-ring" />
            <span className="portrait-ring ring-two" />
            <div className="portrait-core">
              <img src={profile.photo} alt={`${profile.name} profile`} />
            </div>
            <small>PROFILE / SHRUTI SHINDE</small>
          </div>
        </div>

        <div className="identity-facts">
          <div className="identity-cell">
            <HiOutlineMapPin />
            <span className="micro-label">LOCATION</span>
            <strong>{profile.location}</strong>
            <small>Globally collaborative</small>
          </div>
          <div className="identity-cell">
            <HiOutlineSparkles />
            <span className="micro-label">AVAILABILITY</span>
            <strong>{profile.availability}</strong>
            <small>Ready to contribute and grow</small>
          </div>
          <div className="identity-cell">
            <HiOutlineCpuChip />
            <span className="micro-label">HOW I WORK</span>
            <strong>Build. Measure. Learn.</strong>
            <small>Useful software over empty spectacle</small>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default IdentityCard;
