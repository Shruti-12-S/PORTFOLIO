import { motion } from 'framer-motion';
import { HiOutlineArrowTrendingUp } from 'react-icons/hi2';
import SectionHeader from './SectionHeader';
import { achievementsData } from '../data/achievements';

function Timeline() {
  return (
    <section className="section-wrap timeline-section" id="timeline">
      <SectionHeader
        index="03"
        eyebrow="EDUCATION"
        title="Educational Journey"
        description="Freelance work, achievements, open-source contributions, and the education behind my engineering foundation."
      />

      <div className="neural-timeline">
        <div className="neural-line"><span /></div>
        {achievementsData.map((item, index) => (
          <motion.article
            className="timeline-node"
            key={item.id}
            initial={{ opacity: 0, x: index % 2 ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06 }}
          >
            <div className="node-point"><i /></div>
            <div className="timeline-record">
              <div className="timeline-meta">
                <span>{item.id}</span>
                <span>{item.date}</span>
                <strong>{item.signal}</strong>
              </div>
              <p className="micro-label">{item.type} / {item.company}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.article>
        ))}
        <div className="timeline-future">
          <HiOutlineArrowTrendingUp />
          <span>WHAT IS NEXT</span>
          <strong>Ready to create meaningful impact</strong>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
