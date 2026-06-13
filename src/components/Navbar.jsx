import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi';
import { HiArrowUpRight } from 'react-icons/hi2';
import { navItems } from '../data/profile';

function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Shruti Shinde home">
          <span className="brand-symbol">SS</span>
          <span className="brand-copy">
            <strong>SHRUTI SHINDE</strong>
            <small>FULL-STACK + AI/ML + Data Science</small>
          </span>
        </a>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <a className="nav-cta" href="#contact">
          <span>Contact me</span>
          <HiArrowUpRight />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <HiOutlineX /> : <HiOutlineMenuAlt4 />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item, index) => (
              <a href={`#${item.id}`} key={item.id} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
