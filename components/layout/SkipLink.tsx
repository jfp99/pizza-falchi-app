'use client';

/**
 * SkipLink component for accessibility
 * Allows keyboard users to skip directly to main content
 * Becomes visible when focused via Tab key
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary-red focus:text-white focus:rounded-lg focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-yellow transition-all duration-200"
    >
      Aller au contenu principal
    </a>
  );
}
