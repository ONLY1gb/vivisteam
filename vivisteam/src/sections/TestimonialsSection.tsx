import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { cn } from '../lib/utils';

const testimonials = [
  {
    quote:
      'ViviSTEM introduced our students to scientific inquiry in a way that felt hands-on and empowering. They returned ready to lead their own projects.',
    name: 'Dr. Elaine Moreno',
    role: 'Science Department Chair, Westminster High School',
  },
  {
    quote:
      'The mentor network is incredible. My daughter now feels confident presenting at fairs and has a roadmap for high school research.',
    name: 'Priya S.',
    role: 'Parent of Summer Camp Student',
  },
  {
    quote:
      'I learned how to frame my ideas like a real engineer. The workshops made complex concepts fun and collaborative.',
    name: 'Carlos M.',
    role: '2023 ViviSTEM Participant',
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    if (isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, isPaused]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex]);

  return (
    <section
      id="stories"
      className="bg-white py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Impact"
          title="Stories from our community"
          description="Students, families, and partners share how ViviSTEM programming sparks confidence and lasting curiosity."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-[0.6fr_0.4fr]">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-10 shadow-soft">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeTestimonial.quote}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' }}
                className="space-y-6"
                aria-live="polite"
              >
                <p className="text-2xl font-medium leading-snug text-brand-ink">
                  “{activeTestimonial.quote}”
                </p>
                <footer className="text-sm">
                  <p className="font-semibold text-brand-primary">{activeTestimonial.name}</p>
                  <p className="text-neutral-500">{activeTestimonial.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:border-brand-primary/50 hover:text-brand-primary"
                  aria-label="Show previous testimonial"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Prev
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:border-brand-primary/50 hover:text-brand-primary"
                  aria-pressed={isPaused}
                  aria-label={isPaused ? 'Resume testimonial rotation' : 'Pause testimonial rotation'}
                >
                  {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  {isPaused ? 'Play' : 'Pause'}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:border-brand-primary/50 hover:text-brand-primary"
                  aria-label="Show next testimonial"
                >
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'h-2 w-10 rounded-full transition',
                    index === activeIndex ? 'bg-brand-primary' : 'bg-neutral-200 hover:bg-neutral-300'
                  )}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-pressed={index === activeIndex}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-3xl border border-dashed border-brand-primary/30 bg-brand-primary/5 p-8 text-brand-ink">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-primary/80">Program impact</p>
            <ul className="space-y-5 text-sm text-neutral-600">
              <li>
                <span className="font-semibold text-brand-primary">92%</span> of participants report increased confidence in presenting STEM projects.
              </li>
              <li>
                <span className="font-semibold text-brand-primary">15+</span> community partners collaborate to deliver ViviSTEM labs and mentorship.
              </li>
              <li>
                <span className="font-semibold text-brand-primary">70%</span> of alumni return as peer mentors or volunteers within one year.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
