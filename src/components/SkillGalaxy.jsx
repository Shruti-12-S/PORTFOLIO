import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowPath, HiOutlineSignal } from 'react-icons/hi2';
import SectionHeader from './SectionHeader';
import { skillsData } from '../data/skills';

function SkillGalaxy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skillsData[activeIndex];

  return (
    <section className="section-wrap skill-section" id="skills">
      <SectionHeader
        index="02"
        eyebrow="TECHNICAL + INTERPERSONAL SKILLS"
        title="Six focused skill areas"
        description="Select an area to explore the technologies, fundamentals, and interpersonal strengths I bring to a team."
      />

      <div className="galaxy-layout">
        <motion.div
          className="galaxy-map"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />

          <AnimatePresence mode="wait">
            <motion.div
              className="technology-orbit"
              key={active.category}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35 }}
            >
              {active.skills.map((skill, index) => {
                const angle = (index % 5) * 72 + (index % 2) * 30;

                return (
                  <span
                    className={`technology-satellite orbit-group-${index % 2}`}
                    style={{
                      '--angle': `${angle}deg`,
                      '--counter-angle': `${-angle}deg`,
                      '--counter-end': `${-angle - 360}deg`,
                      '--orbit-duration': `${22 + (index % 2) * 8}s`,
                      '--satellite-color': active.color,
                    }}
                    key={skill}
                  >
                    <span>{skill}</span>
                  </span>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {skillsData.map((item, index) => {
            const inactiveIndex = skillsData
              .filter((_, itemIndex) => itemIndex !== activeIndex)
              .findIndex((candidate) => candidate.category === item.category);
            const positionClass = activeIndex === index ? 'active-stack' : `stack-slot-${inactiveIndex}`;

            return (
              <motion.button
                type="button"
                layout
                key={item.category}
                className={`skill-planet ${positionClass}`}
                style={{ '--planet-color': item.color }}
                onClick={() => setActiveIndex(index)}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                aria-pressed={activeIndex === index}
              >
                <span>{item.code}</span>
                <small>{item.category}</small>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.aside
          className="skill-inspector"
          key={active.category}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inspector-topline">
            <span><HiOutlineSignal /> SKILL AREA SELECTED</span>
            <span>{active.code}-0{activeIndex + 1}</span>
          </div>
          <p className="micro-label">SELECTED SKILL AREA</p>
          <h3 style={{ color: active.color }}>{active.category}</h3>
          <div className="skill-focus">
            <span>CORE CAPABILITIES</span>
            <strong>{active.skills.length} skills</strong>
          </div>
          <div className="skill-list">
            {active.skills.map((skill, index) => (
              <span key={skill}><b>0{index + 1}</b>{skill}</span>
            ))}
          </div>
          <button
            type="button"
            className="cycle-button"
            onClick={() => setActiveIndex((activeIndex + 1) % skillsData.length)}
          >
            <HiArrowPath /> Next skill area
          </button>
        </motion.aside>
      </div>
    </section>
  );
}

export default SkillGalaxy;
