'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <nav className="bg-gradient-to-r from-charcoal via-gray-900 to-charcoal shadow-2xl sticky top-0 z-50 border-b-4 border-primary-yellow">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary-red text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">04 42 92 03 08</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold">Ouvert 6j/7 • 18h-21h30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo-pizzafalchi.avif"
                alt="Pizza Falchi"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight">
                PIZZA <span className="text-primary-yellow">FALCHI</span>
              </span>
              <span className="text-xs text-gray-400 font-light tracking-wider">
                AUTHENTIQUE • ARTISANAL
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="relative px-4 py-2 text-white font-semibold transition-all duration-300 group"
            >
              <span className="relative z-10 group-hover:text-charcoal transition-colors">Accueil</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-red to-primary-yellow opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 shadow-lg"></span>
            </Link>
            <Link
              href="/menu"
              className="relative px-4 py-2 text-white font-semibold transition-all duration-300 group"
            >
              <span className="relative z-10 group-hover:text-charcoal transition-colors">Menu</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-yellow to-primary-red opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 shadow-lg"></span>
            </Link>
            <Link
              href="/about"
              className="relative px-4 py-2 text-white font-semibold transition-all duration-300 group"
            >
              <span className="relative z-10 group-hover:text-charcoal transition-colors">À Propos</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-red to-primary-yellow opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 shadow-lg"></span>
            </Link>
            <Link
              href="/contact"
              className="relative px-4 py-2 text-white font-semibold transition-all duration-300 group"
            >
              <span className="relative z-10 group-hover:text-charcoal transition-colors">Contact</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-yellow to-primary-red opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 shadow-lg"></span>
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="ml-4 relative bg-gradient-to-r from-primary-red to-primary-red-dark hover:from-primary-yellow hover:to-primary-red px-6 py-3 rounded-full font-bold text-white hover:text-charcoal transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Panier</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-yellow text-charcoal rounded-full w-7 h-7 text-sm font-black flex items-center justify-center shadow-lg animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            className="lg:hidden bg-primary-red hover:bg-primary-red-light p-2 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-3 text-white hover:bg-primary-red rounded-lg transition font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/menu"
                className="px-4 py-3 text-white hover:bg-primary-red rounded-lg transition font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 text-white hover:bg-primary-red rounded-lg transition font-semibold"
                onClick={() => setIsOpen(false)}
              >
                À Propos
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 text-white hover:bg-primary-red rounded-lg transition font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/cart"
                className="px-4 py-3 bg-primary-red hover:bg-primary-red-light text-white rounded-lg transition font-bold flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Panier</span>
                </div>
                {getTotalItems() > 0 && (
                  <span className="bg-primary-yellow text-charcoal px-3 py-1 rounded-full font-black text-sm">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}