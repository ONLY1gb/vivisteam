import React from 'react';
import { Calendar, Users, HeartHandshake } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { fadeUp, staggerChildren } from '../lib/motion';

const valuePillars = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Mentorship that matters',
    description: 'Personalized guidance from STEM professionals who share their expertise, networks, and passion.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Belonging & support',
    description: 'Inclusive cohorts where students collaborate, build confidence, and celebrate curiosity.',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Structured growth',
    description: 'Project-based curriculum designed to develop skills, spark innovation, and prepare for competitions.',
  },
];

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      className="bg-white py-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
      variants={staggerChildren(0.18)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
          eyebrow="Our mission"
          title={
            <span>
              Every student deserves access to transformative STEM mentorship and experiences.
            </span>
          }
          description="ViviSTEM designs immersive programs that bridge curiosity and real-world impact. We connect middle and high school students with hands-on labs, design challenges, and a caring mentor network that unlocks long-term success."
        />
        </motion.div>

        <motion.div className="mt-14 grid gap-6 md:grid-cols-3" variants={staggerChildren(0.12)}>
          {valuePillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              className="group rounded-3xl border border-brand-secondary/15 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:border-brand-secondary/35 hover:shadow-2xl"
              variants={fadeUp}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-secondary/15 text-brand-secondary">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-ink">{pillar.title}</h3>
              <p className="mt-4 text-base text-neutral-500">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutSection;
