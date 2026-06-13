import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AITerminalHero from './components/AITerminalHero';
import IdentityCard from './components/IdentityCard';
import SkillGalaxy from './components/SkillGalaxy';
import ProjectLab from './components/ProjectLab';
import RecruiterScan from './components/RecruiterScan';
import Timeline from './components/Timeline';
import CertificationGrid from './components/CertificationGrid';
import ConnectionConsole from './components/ConnectionConsole';
import Footer from './components/Footer';

const sectionIds = [
  'home',
  'projects',
  'skills',
  'timeline',
  'recruiter',
  'certifications',
  'identity',
  'contact',
];

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="command-center">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-plane" />
      <Navbar activeSection={activeSection} />
      <main>
        <AITerminalHero />
        <ProjectLab />
        <SkillGalaxy />
        <Timeline />
        <RecruiterScan />
        <CertificationGrid />
        <IdentityCard />
        <ConnectionConsole />
      </main>
      <Footer />
    </div>
  );
}

export default App;
