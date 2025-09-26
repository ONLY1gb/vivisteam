import React from 'react';
import { cn } from '../lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn('space-y-4', align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left', className)}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary/70">
          {eyebrow}
        </p>
      ) : null}
      <div className={cn('space-y-4', align === 'center' ? 'mx-auto' : undefined)}>
        <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink">{title}</h2>
        <span
          className={cn(
            'block h-1 w-16 rounded-full bg-gradient-to-r from-brand-primary via-emerald-400 to-accent-500',
            align === 'center' ? 'mx-auto' : 'ml-0'
          )}
        />
        {description ? <p className="text-lg text-neutral-500 leading-relaxed">{description}</p> : null}
      </div>
    </div>
  );
}

export default SectionHeader;
