import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Button from './Button';
import { cn } from '../lib/utils';
import { staggerChildren } from '../lib/motion';

type Section = {
  id: string;
  label: string;
};

type NavigationProps = {
  sections: Section[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

const navContainer = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index + 0.1, duration: 0.25, ease: 'easeOut' },
  }),
};

export function Navigation({ sections, activeSection, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollProgressSpring = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.0005,
  });

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 overflow-hidden backdrop-blur-xl"
      variants={navContainer}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'visible'}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        variants={backgroundVariants}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'visible'}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
        <div className="absolute left-10 top-3 h-10 w-10 rounded-full bg-brand-primary/20 blur-2xl" />
        <div className="absolute right-16 top-6 h-12 w-12 rounded-full bg-accent-500/15 blur-2xl" />
      </motion.div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-brand-primary via-emerald-400 to-accent-500"
        style={{
          transformOrigin: 'left center',
          scaleX: shouldReduceMotion ? 1 : scrollProgressSpring,
        }}
        initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
      />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a
          href="#home"
          className="flex items-center gap-3"
          onClick={() => handleNavigate('home')}
          variants={navItem}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src="/ViviStem_2.png"
            alt="ViviSTEM logo"
            className="h-12 w-12 rounded-full border border-white/70 shadow-soft"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
          <span className="hidden font-display text-xl font-semibold tracking-tight text-brand-ink sm:block">
            ViviSTEM
          </span>
        </motion.a>

        <motion.nav
          className="hidden items-center gap-2 md:flex"
          initial={shouldReduceMotion ? undefined : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
          variants={staggerChildren(0.08)}
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              custom={index}
              variants={navItem}
              onClick={() => handleNavigate(section.id)}
              className={cn(
                'relative rounded-full px-5 py-2 text-sm font-medium text-neutral-500 transition-colors',
                activeSection === section.id ? 'text-brand-ink' : 'hover:text-brand-ink'
              )}
            >
              <span className="relative z-10">{section.label}</span>
              <AnimatePresence>
                {activeSection === section.id ? (
                  <>
                    <motion.span
                      key="bg"
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-primary/10"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    />
                    <motion.span
                      key="indicator"
                      layoutId="nav-indicator"
                      className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-[0_0_10px_rgba(31,138,112,0.45)]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    />
                  </>
                ) : null}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.nav>

        <motion.div
          className="hidden md:block"
          variants={navItem}
          custom={sections.length + 1}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
        >
          <Button href="#volunteer" variant="primary" hideExternalIcon>
            Get Involved
          </Button>
        </motion.div>

        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/60 p-2 text-brand-ink transition hover:bg-white md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-white/40 bg-white/90 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleNavigate(section.id)}
                  className={cn(
                    'rounded-full px-4 py-3 text-left text-base font-medium text-neutral-600 transition',
                    activeSection === section.id ? 'bg-brand-primary/10 text-brand-ink' : 'hover:bg-neutral-100'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.label}
                </motion.button>
              ))}
              <Button href="#volunteer" className="mt-4 w-full" hideExternalIcon>
                Get Involved
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
