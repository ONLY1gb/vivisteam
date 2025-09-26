import React, { useRef, useState } from 'react';
import { Atom, Beaker, BrainCircuit, Handshake, Trophy, UsersRound } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { fadeUp, staggerChildren } from '../lib/motion';
import { cn } from '../lib/utils';

const programHighlights = [
  {
    icon: <Beaker className="h-5 w-5" />,
    title: 'Immersive labs',
    description:
      'Hands-on experiments across chemistry, physics, biology, and engineering guided by mentors who cultivate curiosity.',
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: 'Design thinking',
    description:
      'Students prototype solutions, iterate quickly, and practice communicating their scientific thinking like professionals.',
  },
  {
    icon: <UsersRound className="h-5 w-5" />,
    title: 'Mentor network',
    description: 'A community of STEM leaders providing 1:1 coaching, college advice, and professional insights.',
  },
  {
    icon: <Atom className="h-5 w-5" />,
    title: 'Innovation showcases',
    description:
      'Guided milestones help every team prepare presentations, poster sessions, and live demos that celebrate their discoveries.',
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: 'Competition readiness',
    description:
      'Structured coaching for science fairs, robotics leagues, and STEM challenges ensures projects are polished and competition-ready.',
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: 'Community partnerships',
    description:
      'Collaborations with local universities, labs, and STEM companies extend ViviSTEM learning opportunities year-round.',
  },
];

const timeline = [
  {
    phase: 'Discover',
    summary: 'Launch workshops',
    details: 'Students explore STEM pathways and collaborate on team design sprints led by mentors.',
  },
  {
    phase: 'Build',
    summary: 'Deep-dive camps',
    details: 'Week-long summer intensives blend lab time, field trips, and project development with daily mentor standups.',
  },
  {
    phase: 'Elevate',
    summary: 'Science fair readiness',
    details:
      'Coaching on research plans, presentation storytelling, and competition preparation with structured feedback loops.',
  },
  {
    phase: 'Sustain',
    summary: 'Year-round community',
    details:
      'Continued mentorship, monthly virtual workshops, and leadership opportunities to give back as near-peer mentors.',
  },
];

export function ProgramsSection() {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLOListElement | null>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(timelineProgress, 'change', (value) => {
    if (shouldReduceMotion || timeline.length < 2) {
      return;
    }

    const clamped = Math.min(Math.max(value, 0), 1);
    const nextIndex = Math.round(clamped * (timeline.length - 1));

    setActiveMilestone((previous) => (previous === nextIndex ? previous : nextIndex));
  });

  return (
    <motion.section
      id="programs"
      className="bg-neutral-50 py-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.25 }}
      variants={staggerChildren(0.18)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Programs"
            align="left"
            title="Curriculum designed to spark curiosity and build lasting confidence"
            description="From first science fair projects to advanced research coaching, ViviSTEM aligns programming with each student’s journey."
          />
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div className="space-y-6" variants={staggerChildren(0.12)}>
            {programHighlights.map((highlight) => (
              <motion.div
                key={highlight.title}
                className="flex gap-4 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm transition hover:border-brand-primary/40 hover:bg-brand-primary/5"
                variants={fadeUp}
                whileHover={shouldReduceMotion ? undefined : { y: -7, scale: 1.01, boxShadow: '0 26px 42px -30px rgba(31,138,112,0.5)' }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <div className="flex h-full w-full items-center justify-center">{highlight.icon}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-ink">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="rounded-3xl border border-neutral-100 bg-white p-10 shadow-soft"
            variants={staggerChildren(0.12)}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-brand-primary"
              variants={fadeUp}
            >
              <Trophy className="h-4 w-4" /> Success roadmap
            </motion.div>
            <motion.h3 className="mt-6 text-2xl font-semibold text-brand-ink" variants={fadeUp}>
              A year-long journey that scales with every student
            </motion.h3>
            <motion.p className="mt-3 text-sm text-neutral-500" variants={fadeUp}>
              We guide participants from discovery to showcase through intentionally sequenced programs, mentorship, and peer collaboration.
            </motion.p>

          <motion.ol
            ref={timelineRef}
            className="relative mt-8 space-y-6"
            variants={staggerChildren(0.1)}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute left-[1.05rem] top-2 bottom-2 w-px rounded-full bg-brand-primary/15"
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-[1.05rem] top-2 bottom-2 w-px origin-top rounded-full bg-gradient-to-b from-brand-primary via-emerald-400 to-accent-500"
              style={{
                scaleY: shouldReduceMotion ? 1 : timelineProgress,
              }}
            />
            {timeline.map((item, index) => {
              const isActive = index === activeMilestone;
              const isComplete = index < activeMilestone;
              const indicatorBackground = isComplete
                ? 'rgba(31,138,112,0.18)'
                : isActive
                  ? 'rgba(31,138,112,0.15)'
                  : 'rgba(255,255,255,0.85)';
              const indicatorBorder = isActive || isComplete ? 'rgba(31,138,112,0.45)' : 'rgba(226,232,240,1)';
              const indicatorText = isActive || isComplete ? 'rgba(31,138,112,1)' : 'rgba(100,116,139,1)';

              return (
                <motion.li
                  key={item.phase}
                  variants={fadeUp}
                  className={cn(
                    'relative overflow-hidden rounded-2xl border px-6 py-5 pl-12 transition-all duration-300 backdrop-blur',
                    isActive
                      ? 'border-brand-primary/70 bg-white shadow-soft'
                      : isComplete
                        ? 'border-brand-primary/40 bg-brand-primary/5'
                        : 'border-neutral-100 bg-white/75'
                  )}
                  whileHover={shouldReduceMotion ? undefined : { x: 6 }}
                >
                  <motion.span
                    layout
                    aria-hidden
                    className="absolute left-4 top-5 flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold"
                    animate={{
                      backgroundColor: indicatorBackground,
                      borderColor: indicatorBorder,
                      color: indicatorText,
                      boxShadow: isActive ? '0 12px 25px -18px rgba(31,138,112,0.6)' : '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  >
                    {index + 1}
                  </motion.span>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                      {item.phase}
                    </p>
                    <p className="text-lg font-semibold text-brand-ink">{item.summary}</p>
                    <p className="text-sm text-neutral-500">{item.details}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </motion.div>
        </div>

        <motion.div className="mt-12 grid gap-6 md:grid-cols-2" variants={staggerChildren(0.14)}>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary to-emerald-500 p-8 text-white shadow-brand"
            variants={fadeUp}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-60" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.4em] text-white/80">
                <Atom className="h-5 w-5" />
                <span>Summer 2024 spotlight</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-xl font-semibold">Orange County Science & Engineering Fair</h4>
                  <p className="mt-2 text-sm text-white/80">
                    July 8 - 12, 2024 · 9:00 AM - 4:00 PM · Grades 6-9
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Santa Ana Boys & Girls Club</h4>
                  <p className="mt-2 text-sm text-white/80">
                    July 22 - 26, 2024 · 10:00 AM - 4:00 PM · Grades 6-8
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-dashed border-brand-primary/30 bg-white p-8 text-sm text-brand-ink shadow-sm"
            variants={fadeUp}
          >
            <h4 className="text-lg font-semibold text-brand-primary">We design inclusive experiences.</h4>
            <p className="mt-2 text-neutral-500">
              From accessible labs to transportation support and scholarships, ViviSTEM is committed to removing barriers that block students from pursuing their passions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProgramsSection;
