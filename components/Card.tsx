import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Use the global `.card` style (index.css) so we don't fight inline styles or
 * reference undefined tokens like `--md-sys-color-on-surface-variant`.
 */
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`card rounded-2xl transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
