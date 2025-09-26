import React from 'react';
import { Handshake, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { fadeUp, staggerChildren } from '../lib/motion';

const partners = [
  'Orange County Science & Engineering Fair',
  'Santa Ana Boys & Girls Club',
  'Dragon Kim Foundation',
  'Westminster High School',
  'Irvine Unified School District STEM Department',
  'Local STEM industry mentors & alumni network',
];

export function PartnersSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="partners"
      className="bg-white py-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
      variants={staggerChildren(0.18)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
          eyebrow="Partners"
          title="Collaboration amplifies student impact"
          description="Our partners power scholarships, provide space and lab access, and join us in delivering unforgettable STEM programming."
        />
        </motion.div>

        <motion.div className="mt-14 grid gap-6 md:grid-cols-2" variants={staggerChildren(0.14)}>
          {partners.map((partner) => (
            <motion.div
              key={partner}
              className="flex items-center justify-between rounded-3xl border border-neutral-100 bg-neutral-50/60 px-6 py-5 text-brand-ink shadow-sm transition hover:border-brand-primary/40 hover:bg-white"
              variants={fadeUp}
              whileHover={shouldReduceMotion ? undefined : { y: -6, boxShadow: '0 24px 36px -28px rgba(31,138,112,0.35)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <Handshake className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium">{partner}</p>
              </div>
              <ArrowUpRight className="hidden h-5 w-5 text-brand-primary md:block" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default PartnersSection;
