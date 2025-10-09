import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-charcoal to-black text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-primary-red via-primary-yellow to-primary-red"></div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo-pizzafalchi.avif"
                  alt="Pizza Falchi"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">
                  PIZZA <span className="text-primary-yellow">FALCHI</span>
                </span>
                <span className="text-xs text-gray-400 tracking-wider">
                  AUTHENTIQUE • ARTISANAL
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Le <span className="text-primary-yellow font-semibold">food truck de pizza artisanale</span> qui vous régale avec des ingrédients frais d'Italie
              et un savoir-faire authentique transmis de génération en génération.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-red p-3 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-red p-3 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-red p-3 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-xl font-black mb-6 text-primary-yellow uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary-yellow group-hover:w-4 transition-all duration-200"></span>
                  <span className="font-medium">Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary-yellow group-hover:w-4 transition-all duration-200"></span>
                  <span className="font-medium">Menu</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary-yellow group-hover:w-4 transition-all duration-200"></span>
                  <span className="font-medium">À Propos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-yellow transition-colors duration-200 flex items-center space-x-2 group"
                >
                  <span className="w-0 h-0.5 bg-primary-yellow group-hover:w-4 transition-all duration-200"></span>
                  <span className="font-medium">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-black mb-6 text-primary-yellow uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+33123456789"
                className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="bg-primary-red p-2 rounded-lg group-hover:bg-primary-red-light transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Téléphone</p>
                  <p className="text-white font-semibold">+33 1 23 45 67 89</p>
                </div>
              </a>

              <a
                href="mailto:contact@pizzafalchi.com"
                className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="bg-primary-red p-2 rounded-lg group-hover:bg-primary-red-light transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                  <p className="text-white font-semibold">contact@pizzafalchi.com</p>
                </div>
              </a>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-red p-2 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Localisation</p>
                  <p className="text-white font-semibold">Place du Marché</p>
                  <p className="text-gray-300">75000 Paris</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-red p-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Horaires</p>
                  <p className="text-white font-semibold">Lun - Dim</p>
                  <p className="text-gray-300">11h00 - 22h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="text-primary-yellow font-semibold">Pizza Falchi</span>. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-primary-yellow transition">
                Mentions Légales
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-yellow transition">
                Politique de Confidentialité
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-yellow transition">
                CGV
              </Link>
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