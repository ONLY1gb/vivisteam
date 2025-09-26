import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { fadeIn, fadeUp, staggerChildren } from '../lib/motion';

const galleryItems = [
  {
    title: 'Chemistry Lab Work',
    description: 'Hands-on experiments exploring reactions, measurement, and data tracking.',
    image:
      'https://images.pexels.com/photos/8471918/pexels-photo-8471918.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Microscope Studies',
    description: 'Discovering the micro world with guided investigations and journaling.',
    image:
      'https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Physics Exploration',
    description: 'Modeling motion and energy through build-and-test challenges.',
    image:
      'https://images.pexels.com/photos/8471834/pexels-photo-8471834.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Team Experiments',
    description: 'Collaborative problem-solving sessions with mentor feedback.',
    image:
      'https://images.pexels.com/photos/8471907/pexels-photo-8471907.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Science Fair Prep',
    description: 'Storytelling workshops to communicate findings with confidence.',
    image:
      'https://images.pexels.com/photos/8471833/pexels-photo-8471833.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Lab Investigations',
    description: 'Applying the scientific method to real-world questions.',
    image:
      'https://images.pexels.com/photos/8471906/pexels-photo-8471906.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const activeItem = selectedIndex != null ? galleryItems[selectedIndex] : null;
  const shouldReduceMotion = useReducedMotion();
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const totalItems = galleryItems.length;

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    lastFocusedElement.current?.focus();
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      setSelectedIndex(((index % totalItems) + totalItems) % totalItems);
    },
    [totalItems]
  );

  useEffect(() => {
    if (selectedIndex == null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToIndex(selectedIndex + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToIndex(selectedIndex - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const focusTarget = lightboxRef.current?.querySelector<HTMLButtonElement>('button:not([aria-hidden="true"])');
    focusTarget?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, goToIndex, closeLightbox]);

  return (
    <motion.section
      id="gallery"
      className="bg-white py-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
      variants={staggerChildren(0.2)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Gallery"
            title="Science experiences that inspire lasting curiosity"
            description="Every session blends experimentation, reflection, and storytelling. Explore highlights from recent ViviSTEM programs."
          />
        </motion.div>

        <motion.div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" variants={staggerChildren(0.12)}>
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={(event) => {
                lastFocusedElement.current = event.currentTarget;
                setSelectedIndex(index);
              }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-100/40 text-left shadow-soft transition hover:-translate-y-2 hover:border-brand-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2"
              variants={fadeUp}
              aria-label={`Open larger view of ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-transparent px-6 pb-6 pt-24 text-white">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-white/80">{item.description}</p>
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 rounded-3xl border border-dashed border-brand-primary/30 bg-brand-primary/5 p-8 text-center"
          variants={fadeUp}
        >
          <p className="text-base text-brand-ink">
            Interested in spotlighting a ViviSTEM experience? <span className="font-semibold">We love sharing student stories.</span>
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            key="lightbox-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="presentation"
          >
            <motion.div
              className="relative mx-4 flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-lightbox-heading"
              aria-describedby="gallery-lightbox-description"
              ref={lightboxRef}
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full bg-brand-ink/80 px-3 py-1 text-sm font-semibold text-white transition hover:bg-brand-ink"
                onClick={closeLightbox}
                aria-label="Close gallery detail"
              >
                Close
              </button>
              <img src={activeItem.image} alt={activeItem.title} className="h-[360px] w-full object-cover" />
              <div className="space-y-3 p-6">
                <p
                  className="text-xs uppercase tracking-[0.3em] text-brand-secondary/80"
                  id="gallery-lightbox-heading"
                >
                  ViviSTEM Gallery
                </p>
                <h3 className="text-2xl font-semibold text-brand-ink">{activeItem.title}</h3>
                <p className="text-sm text-neutral-500" id="gallery-lightbox-description">
                  {activeItem.description}
                </p>
                <div className="flex items-center justify-between pt-4 text-xs uppercase tracking-[0.3em] text-neutral-400">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-[0.7rem] font-semibold text-brand-ink transition hover:border-brand-primary/50 hover:text-brand-primary"
                    onClick={() => goToIndex((selectedIndex ?? 0) - 1)}
                    aria-label="View previous gallery item"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Prev
                  </button>
                  <span className="font-semibold text-neutral-500">
                    {selectedIndex != null ? selectedIndex + 1 : 0} / {totalItems}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-[0.7rem] font-semibold text-brand-ink transition hover:border-brand-primary/50 hover:text-brand-primary"
                    onClick={() => goToIndex((selectedIndex ?? 0) + 1)}
                    aria-label="View next gallery item"
                  >
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}

export default GallerySection;
