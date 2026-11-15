import * as React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  href,
  ...props
}) => {
  const Comp: React.ElementType = asChild || href ? 'a' : 'button';

  const variants = {
    primary: 'bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:bg-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    secondary: 'bg-white text-navy-900 px-6 py-3 rounded-xl font-medium border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
    outline: 'border border-slate-200 text-navy-900 px-6 py-3 rounded-xl font-medium shadow-sm hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
    ghost: 'text-navy-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const buttonProps = href || asChild
    ? { ...props, href: href || undefined, 'data-as-child': asChild }
    : { ...props, type: 'button' as const };

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap',
        variants[variant],
        sizes[size],
        className,
      )}
      {...(buttonProps as Record<string, unknown>)}
    />
  );
};

Button.displayName = 'Button';

export { Button };