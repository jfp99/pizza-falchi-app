import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { SPACING, ROUNDED, SHADOWS } from '@/lib/design-constants';

/**
 * Skeleton loading state for ProductCard
 * Maintains layout consistency while products load
 */
export default function ProductCardSkeleton() {
  return (
    <div
      className={`bg-white ${ROUNDED.xl} ${SPACING.cardPadding} ${SHADOWS.md} border-2 border-gray-100`}
      aria-busy="true"
      aria-label="Chargement du produit..."
    >
      {/* Image Skeleton */}
      <div className="relative mb-4">
        <Skeleton variant="rectangular" height="200px" className="w-full" />
      </div>

      {/* Title Skeleton */}
      <Skeleton variant="text" height="28px" className="w-3/4 mb-3" />

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton variant="text" height="16px" className="w-full" />
        <Skeleton variant="text" height="16px" className="w-5/6" />
      </div>

      {/* Ingredients Skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="80px" height="24px" />
        <Skeleton variant="rectangular" width="70px" height="24px" />
        <Skeleton variant="rectangular" width="65px" height="24px" />
      </div>

      {/* Price and Button Skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Skeleton variant="text" width="80px" height="32px" />
        <Skeleton variant="rectangular" width="120px" height="44px" className="rounded-xl" />
      </div>
    </div>
  );
}
