import { motion } from 'framer-motion';
import {
  HiArrowDownTray,
  HiArrowUpRight,
  HiCheckBadge,
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlinePresentationChartLine,
} from 'react-icons/hi2';
import SectionHeader from './SectionHeader';
import { profile } from '../data/profile';

const reasons = [
  {
    icon: HiOutlineCpuChip,
    title: 'End-to-end development',
    text: 'Builds interfaces, APIs, databases, and data-driven features across a complete product flow.',
  },
  {
    icon: HiOutlinePresentationChartLine,
    title: 'Applied AI and data',
    text: 'Uses machine learning and analysis to solve defined product problems, not as decoration.',
  },
  {
    icon: HiOutlineBolt,
    title: 'Ready to learn and contribute',
    text: 'Brings strong fundamentals, project ownership, and a collaborative engineering mindset.',
  },
];

function RecruiterScan() {
  return (
    <section className="section-wrap recruiter-section" id="recruiter">
      <SectionHeader
        index="04"
        eyebrow="RECRUITER SUMMARY"
        title="Why hire me"
        description="A concise view of the strengths I can bring to an engineering team."
      />

      <motion.div
        className="scan-report"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="report-masthead">
          <div>
            <span className="micro-label">CANDIDATE SUMMARY</span>
            <p className="recruiter-name">Shruti Shinde</p>
            <h3>Full-stack developer with practical experience across web, AI, and data projects.</h3>
          </div>
          <div className="fit-score">
            <span>Available for</span>
            <strong>internships</strong><br/>
            <span><bold>NOW</bold></span>
          </div>
        </div>

        <div className="report-grid">
          <div className="reason-list">
            <p className="micro-label">WHY HIRE SHRUTI?</p>
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div className="reason-item" key={reason.title}>
                  <Icon />
                  <div><strong>{reason.title}</strong><p>{reason.text}</p></div>
                  <HiCheckBadge />
                </div>
              );
            })}
          </div>

          <div className="report-side">
            <div className="signal-block">
              <p className="micro-label">CORE STRENGTHS</p>
              <span><b>01</b><strong>Full-stack engineering</strong><small>React, Node.js, MongoDB</small></span>
              <span><b>02</b><strong>Applied machine learning</strong><small>Python, TensorFlow, Scikit-learn</small></span>
              <span><b>03</b><strong>Data analysis</strong><small>Pandas, Power BI, statistics</small></span>
            </div>
          </div>
        </div>

        <div className="report-footer">
          <p><i /> Available for new opportunities</p>
          <div>
            <a
              className="primary-button"
              href={profile.resumeUrl}
              download={profile.resumeFilename}
            >
              Download resume <HiArrowDownTray />
            </a>
            <a className="text-button" href="#contact">Start a conversation <HiArrowUpRight /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default RecruiterScan;
