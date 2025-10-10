import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-charcoal to-black text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-primary-red via-primary-yellow to-primary-red"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content - Compact Single Row with Aligned Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Logo & Tagline */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center space-x-2 mb-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo-pizzafalchi.jpg"
                  alt="Pizza Falchi Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">
                  PIZZA <span className="text-primary-yellow">FALCHI</span>
                </span>
                <span className="text-xs text-gray-400 tracking-wider">
                  AUTHENTIQUE • ARTISANAL
                </span>
              </div>
            </Link>
            {/* Social Media */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-sky-500 p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold mb-3 text-primary-yellow uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-yellow transition-all duration-300 text-sm inline-block hover:translate-x-1 hover:font-semibold">
                  → Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-primary-red transition-all duration-300 text-sm inline-block hover:translate-x-1 hover:font-semibold">
                  → Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-yellow transition-all duration-300 text-sm inline-block hover:translate-x-1 hover:font-semibold">
                  → À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-red transition-all duration-300 text-sm inline-block hover:translate-x-1 hover:font-semibold">
                  → Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Compact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold mb-3 text-primary-yellow uppercase tracking-wider">Contact</h3>
            <div className="space-y-2 text-sm">
              <a href="tel:+33442920308" className="flex items-center gap-2 text-gray-300 hover:text-primary-yellow transition-all duration-300 hover:translate-x-1">
                <Phone className="w-3.5 h-3.5" />
                <span>04 42 92 03 08</span>
              </a>
              <a href="mailto:pizzafalchipro@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-primary-red transition-all duration-300 hover:translate-x-1">
                <Mail className="w-3.5 h-3.5" />
                <span>pizzafalchipro@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>615, av. de la Touloubre, 13540 Puyricard</span>
              </div>
            </div>
          </div>

          {/* Hours - Compact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold mb-3 text-primary-yellow uppercase tracking-wider">Horaires</h3>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Mar - Dim</span>
              </div>
              <p className="text-white font-semibold">18h00 - 21h30</p>
              <p className="text-gray-400 text-xs">Fermé le lundi</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="border-t border-gray-800 mt-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <p className="text-gray-400">
              © {currentYear} <span className="text-primary-yellow font-semibold">Pizza Falchi</span>. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-primary-red transition-colors">Mentions Légales</Link>
              <Link href="#" className="text-gray-400 hover:text-primary-yellow transition-colors">Confidentialité</Link>
              <Link href="#" className="text-gray-400 hover:text-primary-red transition-colors">CGV</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,210,0,0.1),transparent_50%)]"></div>
      </div>
    </footer>
  );
}