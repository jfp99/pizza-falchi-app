import Link from 'next/link';
import { Pizza, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-soft-red-lighter to-soft-yellow-lighter flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Pizza Icon Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Pizza className="w-32 h-32 text-primary-red animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-charcoal">404</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Oups! Page non trouvée
        </h1>

        <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">
          Cette page semble avoir été livrée à la mauvaise adresse...
          Comme une pizza perdue en route!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Retour à la maison
          </Link>

          <Link
            href="/menu"
            className="bg-primary-yellow text-charcoal px-8 py-4 rounded-full font-bold hover:bg-primary-yellow-dark transition-all duration-200 inline-flex items-center gap-2 group"
          >
            <Pizza className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Voir notre menu
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-gray-600 mb-4">
            Besoin d&apos;aide? Contactez-nous:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a
              href="tel:+33442920308"
              className="text-primary-red hover:underline font-semibold"
            >
              📞 04 42 92 03 08
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link
              href="/contact"
              className="text-primary-red hover:underline font-semibold"
            >
              📧 Formulaire de contact
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-6xl opacity-20">
          🍕 🍕 🍕
        </div>
      </div>
    </div>
  );
}
