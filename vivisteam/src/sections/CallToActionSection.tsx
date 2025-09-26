import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../components/Button';
import { fadeUp, staggerChildren } from '../lib/motion';

export function CallToActionSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="volunteer"
      className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-accent-500 py-24 text-white"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
      variants={staggerChildren(0.18)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/3 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 text-center sm:px-6"
        variants={fadeUp}
      >
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to accelerate the next wave of STEM leaders?
        </h2>
        <p className="max-w-2xl text-base text-white/80">
          ViviSTEM is powered by volunteers, mentors, and students who believe science should be bold, inclusive, and hands-on. Bring a team, sponsor a lab, or refer a future STEM changer.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            href="https://docs.google.com/forms/d/e/1FAIpQLScGBaxR1F-zF6FZtLd6fbNvk4e1RajMSbSp2JnZU3jBz3gwTw/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            Volunteer Application
          </Button>
          <Button
            href="https://docs.google.com/forms/d/e/1FAIpQLScgVEDRfDz9F0kd4DmAFZ-J4VAukfyQShc0ydZ59hkOoi7yNA/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            hideExternalIcon
            className="bg-white text-brand-ink"
          >
            Student Registration
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default CallToActionSection;
