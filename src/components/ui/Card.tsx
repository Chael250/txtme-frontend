import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = ({ className, glass, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'card',
        glass && 'glass',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
