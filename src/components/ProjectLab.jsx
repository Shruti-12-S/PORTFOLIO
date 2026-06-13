import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiAdjustmentsHorizontal, HiArrowRight, HiOutlineBeaker } from 'react-icons/hi2';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projectModes, projectsData } from '../data/projects';

function ProjectLab() {
  const [mode, setMode] = useState('Featured');
  const filteredProjects = useMemo(
    () => {
      if (mode === 'Featured') return projectsData.filter((project) => project.featured);
      if (mode === 'All') return projectsData;
      return projectsData.filter((project) => project.modes.includes(mode));
    },
    [mode],
  );

  return (
    <section className="section-wrap project-section" id="projects">
      <SectionHeader
        index="01"
        eyebrow="SELECTED WORK"
        title="Selected projects"
        description="Project previews, technology stacks, source code, and live demos for my practical web, AI, and data work."
      />

      <div className="lab-console">
        <div className="lab-console-label">
          <span><HiOutlineBeaker /> FILTER PROJECTS</span>
          <span>{String(filteredProjects.length).padStart(2, '0')} PROJECTS FOUND</span>
        </div>
        <div className="lab-filters">
          <HiAdjustmentsHorizontal />
          {projectModes.map((item) => (
            <button
              type="button"
              className={mode === item ? 'active' : ''}
              onClick={() => setMode(item)}
              aria-pressed={mode === item}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="project-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => <ProjectCard project={project} key={project.id} />)}
          {filteredProjects.length === 0 && (
            <motion.article
              className="project-empty-state"
              key={`empty-${mode}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-empty-icon"><HiOutlineBeaker /></div>
              <h3>Projects are coming soon.</h3>
              <button type="button" className="project-empty-action" onClick={() => setMode('Featured')}>
                View featured projects <HiArrowRight />
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default ProjectLab;
