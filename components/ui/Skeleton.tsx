import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton loading component for placeholder content
 * Provides visual feedback while content is loading
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, animation = 'pulse', className = '', ...props }, ref) => {
    const baseStyles = 'bg-gray-200';

    const variants = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-shimmer',
      none: '',
    };

    const style: React.CSSProperties = {
      width: width,
      height: height || (variant === 'text' ? '1em' : undefined),
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${animations[animation]} ${className}`}
        style={style}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
