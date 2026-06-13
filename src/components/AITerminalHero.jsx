import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiArrowDown,
  HiArrowDownTray,
  HiArrowUpRight,
  HiCheckBadge,
  HiOutlineChartBar,
  HiOutlineCircleStack,
  HiOutlineCodeBracket,
  HiOutlineCommandLine,
  HiOutlineCpuChip,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import {
  FaGithub,
  FaLinkedinIn,
} from 'react-icons/fa';
import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKaggle,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
} from 'react-icons/si';
import { profile } from '../data/profile';
import { skillsData } from '../data/skills';

const commands = [
  { command: 'role', output: 'Full-Stack Developer // AI & Data Focus' },
  { command: 'stack', output: 'React + Node.js + MongoDB + Python + Machine Learning' },
  { command: 'availability', output: 'Open to full-time and internship opportunities' },
];

const marqueeCategories = new Set(['MERN Stack', 'AI/ML', 'Data Science']);

const technologies = [
  ...new Set(
    skillsData
      .filter((stack) => marqueeCategories.has(stack.category))
      .flatMap((stack) => stack.skills),
  ),
];

const technologyIcons = {
  MongoDB: SiMongodb,
  'Express.js': SiExpress,
  React: SiReact,
  'Node.js': SiNodedotjs,
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  'Tailwind CSS': SiTailwindcss,
  'REST APIs': HiOutlineCommandLine,
  'Git & GitHub': SiGithub,
  Python: SiPython,
  SQL: HiOutlineCircleStack,
  MySQL: SiMysql,
  TensorFlow: SiTensorflow,
  'Scikit-learn': SiScikitlearn,
  'Machine Learning': HiOutlineCpuChip,
  'Deep Learning': HiOutlineSparkles,
  'Natural Language Processing': HiOutlineCodeBracket,
  'Gemini AI': HiOutlineSparkles,
  OpenAI: HiOutlineSparkles,
  'Jupyter Notebook': SiJupyter,
  Flask: SiFlask,
  Docker: SiDocker,
  Kaggle: SiKaggle,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Matplotlib: HiOutlineChartBar,
  Seaborn: HiOutlineChartBar,
  XGBoost: HiOutlineChartBar,
};

function AITerminalHero() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= commands.length) return undefined;
    const target = commands[lineIndex].command;

    if (currentText.length < target.length) {
      const timer = setTimeout(
        () => setCurrentText(target.slice(0, currentText.length + 1)),
        55,
      );
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleLines((lines) => [...lines, commands[lineIndex]]);
      setCurrentText('');
      setLineIndex((index) => index + 1);
    }, 430);
    return () => clearTimeout(timer);
  }, [currentText, lineIndex]);

  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-topline">
        <span>SHRUTI SHINDE / PORTFOLIO</span>
        <span className="system-online"><i /> OPEN TO OPPORTUNITIES</span>
        <span>INDIA / REMOTE</span>
      </div>

      <div className="hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow"><HiOutlineCommandLine /> MERN STACK DEVELOPER + AI/ML ENGINEER + DATA SCIENTIST</div>
          <h1 className="hero-name">
            Shruti
            <span>Shinde.</span>
          </h1>
          <p className="hero-role">Full-stack developer with an AI &amp; data focus.</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a
              className="primary-button"
              href={profile.resumeUrl}
              download={profile.resumeFilename}
            >
              Download resume <HiArrowDownTray />
            </a>
            <a className="text-button" href="#projects">
              View selected projects <HiArrowUpRight />
            </a>
          </div>
          <div className="hero-socials" aria-label="Professional profiles">
            <a href="https://github.com/shruti-12-S" target="_blank" rel="noreferrer">
              <FaGithub /> GitHub <HiArrowUpRight />
            </a>
            <a href="https://www.linkedin.com/in/shruti-shinde-p12" target="_blank" rel="noreferrer">
              <FaLinkedinIn /> LinkedIn <HiArrowUpRight />
            </a>
          </div>
          <p className="resume-meta"><HiCheckBadge /> Updated June 2026</p>
        </motion.div>

        <div className="hero-visual">
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="terminal-bar">
              <div className="window-controls"><i /><i /><i /></div>
              <span>shruti@Shinde:~</span>
              <span>SECURE</span>
            </div>
            <div className="terminal-body">
              <p className="terminal-muted">A quick overview for recruiters, collaborators, and curious visitors.</p>
              {visibleLines.map((line) => (
                <div className="terminal-entry" key={line.command}>
                  <p><b>&gt;</b> {line.command}</p>
                  <span>{line.output}</span>
                </div>
              ))}
              {lineIndex < commands.length && (
                <p className="terminal-input"><b>&gt;</b> {currentText}<i /></p>
              )}
              {lineIndex >= commands.length && (
                <p className="terminal-input"><b>&gt;</b> <i /></p>
              )}
            </div>
            <div className="terminal-commands">
              <a href="#skills">&gt; view skills</a>
              <a href="#projects">&gt; view projects</a>
              <a href={profile.resumeUrl} download={profile.resumeFilename}>&gt; resume.pdf <HiArrowDown /></a>
            </div>
          </motion.div>

          <motion.div
            className="hero-radar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="radar-disc">
              <span className="radar-sweep" />
              <span className="radar-core">SS</span>
              <i className="blip blip-one" />
              <i className="blip blip-two" />
              <i className="blip blip-three" />
            </div>
            <div className="radar-readout">
              <span>CURRENT FOCUS</span>
              <strong>OPEN TO WORK</strong>
              <small>Full-time roles / internships / product teams</small>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="technology-marquee" aria-label="Technologies I use">
        <div className="technology-marquee-track">
          {[0, 1].map((copy) => (
            <div className="technology-marquee-group" aria-hidden={copy === 1} key={copy}>
              {technologies.map((technology) => {
                const TechnologyIcon = technologyIcons[technology] || HiOutlineCodeBracket;

                return (
                  <span key={`${copy}-${technology}`}>
                    <TechnologyIcon aria-hidden="true" />
                    {technology}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AITerminalHero;
