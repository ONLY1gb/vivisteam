import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  icon?: React.ReactNode;
  hideExternalIcon?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-primary to-emerald-500 text-white shadow-brand hover:shadow-xl hover:-translate-y-1',
  secondary:
    'bg-white text-brand-ink border border-brand-primary/30 shadow-sm hover:border-brand-primary/60 hover:text-brand-primary hover:shadow-lg hover:-translate-y-1',
  ghost:
    'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 hover:-translate-y-1',
};

export function Button({
  variant = 'primary',
  href,
  className,
  children,
  icon,
  hideExternalIcon = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 active:scale-95';

  const content = (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {icon}
      {href?.startsWith('http') && !hideExternalIcon && !icon ? (
        <ExternalLink className="h-4 w-4" />
      ) : null}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClasses, variantMap[variant], className)} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={cn(baseClasses, variantMap[variant], className)} {...props}>
      {content}
    </button>
  );
}

export default Button;
