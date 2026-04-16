'use client';

import Link from 'next/link';

const variants = {
  primary:
    'bg-mokara-orange hover:bg-mokara-orange-dark text-white shadow-lg hover:shadow-mokara-orange/30',
  secondary:
    'bg-white hover:bg-mokara-sand text-mokara-dark border border-mokara-sand dark:bg-mokara-dark-soft dark:text-white dark:border-white/10 dark:hover:bg-white/10',
  outline:
    'border-2 border-mokara-orange text-mokara-orange hover:bg-mokara-orange hover:text-white',
  ghost:
    'text-mokara-orange hover:bg-mokara-orange/10',
  white:
    'bg-white text-mokara-dark hover:bg-mokara-sand shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mokara-orange focus:ring-offset-2';
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
