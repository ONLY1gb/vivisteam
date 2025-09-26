import React from 'react';
import { Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import { fadeUp, staggerChildren } from '../lib/motion';
import { CONTACT_EMAIL, openMailClient } from '../lib/email';

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className="bg-neutral-50 py-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
      variants={staggerChildren(0.2)}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
          eyebrow="Contact"
          title="We would love to hear from you"
          description="Reach out for partnership opportunities, student applications, or media inquiries. Our team typically responds within 24 hours."
        />
        </motion.div>

        <motion.div className="mt-12 rounded-3xl border border-neutral-100 bg-white p-10 shadow-soft" variants={fadeUp}>
          <motion.div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between" variants={staggerChildren(0.2)}>
            <div className="flex items-start gap-4 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Email us</p>
                <p className="text-lg font-semibold text-brand-ink">vivistemsummercamp@gmail.com</p>
                <p className="mt-2 text-sm text-neutral-500">Let us know how ViviSTEM can support your community.</p>
              </div>
            </div>

            <Button variant="secondary" hideExternalIcon onClick={() => openMailClient(CONTACT_EMAIL)}>
              Email us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ContactSection;
