import { motion } from 'framer-motion';
import { HiArrowUpRight, HiCheck, HiOutlineShieldCheck } from 'react-icons/hi2';
import SectionHeader from './SectionHeader';
import { certificationsData } from '../data/certifications';

function CertificationGrid() {
  return (
    <section className="section-wrap certification-section" id="certifications">
      <SectionHeader
        index="05"
        eyebrow="CERTIFICATIONS"
        title="Certifications"
        description="Relevant coursework supporting my full-stack, machine learning, and data skills."
      />

      <div className="credential-console">
        <div className="credential-header">
          <span><HiOutlineShieldCheck /> CERTIFICATION LIST</span>
          <span>LEARNING / VERIFIED</span>
        </div>
        <div className="credential-list">
          {certificationsData.map((certification, index) => {
            const Credential = certification.link === '#' ? motion.div : motion.a;

            return (
              <Credential
                href={certification.link === '#' ? undefined : certification.link}
                className={`credential-row ${certification.link === '#' ? 'credential-static' : ''}`}
                key={certification.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="credential-check"><HiCheck /></span>
                <span className="credential-id">{certification.id}</span>
                <span className="credential-name"><strong>{certification.title}</strong><small>{certification.focus}</small></span>
                <span className="credential-issuer">{certification.issuer}</span>
                <span className="credential-year">{certification.date}</span>
                {certification.link === '#' ? <span className="credential-note">Credential</span> : <HiArrowUpRight />}
              </Credential>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CertificationGrid;
