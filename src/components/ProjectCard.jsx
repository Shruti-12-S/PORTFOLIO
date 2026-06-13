import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight, HiOutlineCodeBracket, HiOutlineEye } from 'react-icons/hi2';

function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const updateTilt = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -5,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 5,
    });
  };

  return (
    <motion.article
      className="project-record"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      onMouseMove={updateTilt}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className="record-topline">
        <span>{project.id} / {project.category}</span>
        <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
      </div>
      <div className="project-preview">
        <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
        
      </div>
      <div className="record-heading">
        <div>
          <p className="micro-label">PROJECT NAME</p>
          <h3>{project.title}</h3>
        </div>
      </div>
      <div className="record-impact">
        <i />
        <p><strong>Outcome:</strong> {project.impact}</p>
      </div>
      <p className="micro-label tech-label">TECH STACK USED</p>
      <div className="tech-row">
        {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
      </div>
      <div className="record-actions">
        {project.github !== '#' ? (
          <a className="github-action" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`}>
            <HiOutlineCodeBracket /> GitHub
          </a>
        ) : (
          <span><HiOutlineCodeBracket /> GitHub coming soon</span>
        )}
        {project.demo !== '#' ? (
          <a className="demo-action" href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>
            <HiOutlineEye /> Live demo <HiArrowUpRight />
          </a>
        ) : (
          <span><HiOutlineEye /> Live demo coming soon</span>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;
