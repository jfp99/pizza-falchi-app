'use client';
import { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import LoyaltyModal from './LoyaltyModal';

export default function SpecialOfferBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="py-8 md:py-12 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-soft-red/30 via-soft-yellow/20 to-soft-red/30 backdrop-blur-sm overflow-hidden rounded-3xl border-2 border-primary-red/20 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-yellow/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-red/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 px-6 py-5 md:px-8 md:py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Icon + Content */}
                <div className="flex items-center gap-4 md:gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="bg-primary-red rounded-2xl p-2.5 md:p-3 shadow-md">
                        <Gift className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-primary-yellow fill-primary-yellow" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <span className="bg-primary-red text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Fidélité
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-charcoal mb-0.5">
                      10 Pizzas Achetées = 11<sup className="text-sm">ème</sup> Offerte
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">
                      Profitez de notre programme de fidélité
                    </p>
                  </div>
                </div>

                {/* Call to Action Badge */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-primary-red to-primary-yellow text-white rounded-xl px-5 py-2.5 md:px-6 md:py-3 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <p className="font-bold text-sm md:text-base whitespace-nowrap">
                      En savoir plus
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Very Subtle Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(227,6,19,.1) 15px, rgba(227,6,19,.1) 30px)'
            }}></div>
          </div>
        </div>
      </div>

      {/* Loyalty Modal */}
      <LoyaltyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
