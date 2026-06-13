import { motion } from 'framer-motion';

function SectionHeader({ index, eyebrow, title, description }) {
  return (
    <motion.header
      className="section-header"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.header>
  );
}

export default SectionHeader;
