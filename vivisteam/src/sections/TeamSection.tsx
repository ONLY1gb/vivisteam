import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { fadeUp, staggerChildren } from '../lib/motion';

const teamMembers = [
  {
    name: 'Theertha Hariharan Arulmozhi',
    role: 'Co-Founder · Program Director',
    bio: 'Leads curriculum development and partnerships that expand ViviSTEM’s reach to underrepresented students.',
  },
  {
    name: 'Sebastian Moaleji',
    role: 'Co-Founder · Curriculum Lead',
    bio: 'Designs hands-on labs, mentor training, and pathways into advanced competitions and research experiences.',
  },
  {
    name: 'Leah Chen',
    role: 'Co-Founder · Operations Manager',
    bio: 'Creates smooth program logistics, coordinates volunteer teams, and ensures inclusive classroom environments.',
  },
];

export function TeamSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="team"
      className="bg-neutral-50 py-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
      variants={staggerChildren(0.2)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
          eyebrow="Leadership"
          title="A volunteer-led team of scientists, engineers, and educators"
          description="We are mentors, alumni competitors, and STEM advocates who believe in designing joyful, rigorous STEM experiences for every student."
        />
        </motion.div>

        <motion.div className="mt-14 grid gap-8 md:grid-cols-3" variants={staggerChildren(0.16)}>
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="group flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-sm transition hover:border-brand-primary/40"
              variants={fadeUp}
              whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.01, boxShadow: '0 30px 50px -35px rgba(31,138,112,0.45)' }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-accent-500 text-2xl font-semibold text-white shadow-brand">
                {member.name
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join('')}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-brand-ink">{member.name}</h3>
              <p className="text-sm font-medium text-brand-primary/80">{member.role}</p>
              <p className="mt-4 text-sm text-neutral-500">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default TeamSection;
