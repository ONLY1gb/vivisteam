import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Check, Mail, X } from 'lucide-react';
import { CONTACT_EMAIL, openMailClient } from '../lib/email';

const baseVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  initial: { scale: 0.96, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const emailPanelId = 'floating-email-options';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerInitial = shouldReduceMotion ? undefined : 'hidden';
  const containerAnimate = shouldReduceMotion
    ? { opacity: isVisible ? 1 : 0 }
    : isVisible
      ? 'visible'
      : 'hidden';

  useEffect(() => {
    if (!showEmailOptions) {
      return undefined;
    }

    const focusable = panelRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowEmailOptions(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target as Node)) {
        setShowEmailOptions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [showEmailOptions]);

  return (
    <motion.div
      className="fixed right-4 bottom-5 z-40 flex flex-col gap-3 sm:right-5 sm:bottom-6"
      initial={containerInitial}
      animate={containerAnimate}
      variants={baseVariants}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <motion.button
        type="button"
        className="group relative flex items-center gap-3 rounded-full bg-white/85 px-4 py-2.5 text-sm font-semibold text-brand-ink shadow-[0_20px_35px_-25px_rgba(15,23,42,0.45)] backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2"
        onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
        initial={shouldReduceMotion ? undefined : buttonVariants.initial}
        animate={shouldReduceMotion ? undefined : buttonVariants.animate}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
          <ArrowUp className="h-4 w-4" />
        </span>
        <div className="text-left leading-tight">
          <span className="block text-xs uppercase tracking-[0.25em] text-neutral-400">Navigate</span>
          <span>Back to top</span>
        </div>
      </motion.button>

      <motion.div
        className="relative"
        initial={shouldReduceMotion ? undefined : buttonVariants.initial}
        animate={shouldReduceMotion ? undefined : buttonVariants.animate}
        transition={{ duration: 0.3, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.05 }}
      >
        <motion.button
          type="button"
          className="group relative flex items-center gap-3 rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_25px_45px_-20px_rgba(31,138,112,0.55)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2"
          onClick={() => {
            if (showEmailOptions) {
              setShowEmailOptions(false);
              return;
            }

            openMailClient(CONTACT_EMAIL);
            setShowEmailOptions(true);
          }}
          aria-expanded={showEmailOptions}
          aria-controls={emailPanelId}
          aria-haspopup="dialog"
          ref={triggerRef}
          whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-4 w-4" />
          </span>
          <div className="text-left leading-tight">
            <span className="block text-xs uppercase tracking-[0.25em] text-white/70">Connect</span>
            <span>Email ViviSTEM</span>
          </div>
        </motion.button>

        <AnimatePresence>
          {showEmailOptions ? (
            <motion.div
              key="email-panel"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-white/40 bg-white/95 p-4 text-sm text-brand-ink shadow-[0_18px_45px_-25px_rgba(15,23,42,0.4)] backdrop-blur"
              role="dialog"
              aria-modal="false"
              aria-labelledby="floating-email-options-heading"
              id={emailPanelId}
              ref={panelRef}
            >
              <div className="flex items-center justify-between pb-2">
                <p
                  id="floating-email-options-heading"
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400"
                >
                  Email options
                </p>
                <button
                  type="button"
                  className="text-neutral-400 transition hover:text-brand-primary"
                  onClick={() => setShowEmailOptions(false)}
                  aria-label="Close email options"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    openMailClient(CONTACT_EMAIL);
                    setShowEmailOptions(false);
                    triggerRef.current?.focus();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl border border-brand-primary/30 px-3 py-2 text-left text-sm font-medium transition hover:border-brand-primary/60 hover:bg-brand-primary/5"
                >
                  <Mail className="h-4 w-4 text-brand-primary" />
                  Open email app
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(CONTACT_EMAIL);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2200);
                    } catch {
                      setCopied(false);
                    }
                  }}
                  className="flex w-full items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-left text-sm font-medium transition hover:border-brand-primary/40 hover:bg-neutral-100"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-primary" />
                  Copy email address
                </button>
                <AnimatePresence>
                  {copied ? (
                    <motion.div
                      key="copied"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 rounded-xl bg-brand-primary/10 px-3 py-2 text-xs font-medium text-brand-primary"
                    >
                      <Check className="h-4 w-4" /> Email copied to clipboard
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default FloatingActions;
