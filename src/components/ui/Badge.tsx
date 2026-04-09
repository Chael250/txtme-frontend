import React from 'react';
import { cn } from './Button';

export const Badge = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary border border-primary/10',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
