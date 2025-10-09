import Link from 'next/link';
import Image from 'next/image';
import { Pizza, Truck, Clock, Star, ChefHat, Award, Heart, MapPin } from 'lucide-react';
import SpecialOfferBanner from '@/components/promotions/SpecialOfferBanner';

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Clean & Impactful */}
      <section className="relative min-h-screen flex items-center bg-warm-cream overflow-hidden">
        {/* Large Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-img.avif"
            alt="Pizza Falchi"
            fill
            className="object-cover"
            priority
          />
          {/* Clean overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-block mb-6">
              <span className="bg-primary-red text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider">
                Pizzas Artisanales
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight">
              Des pizzas
              <span className="block text-primary-yellow">
                qui voyagent
              </span>
              <span className="block">jusqu'à vous</span>
            </h1>

            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Authenticité italienne • Ingrédients premium • Savoir-faire artisanal
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/menu"
                className="bg-gradient-to-r from-primary-red to-primary-red-dark hover:from-primary-yellow hover:to-primary-red text-white hover:text-charcoal px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary-yellow/50 text-center"
              >
                Voir le Menu
              </Link>

              <Link
                href="/contact"
                className="border-2 border-white bg-white/10 backdrop-blur text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-charcoal transition-all duration-300 shadow-xl hover:shadow-2xl text-center"
              >
                Nous Trouver
              </Link>
            </div>

            {/* Clean Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-4xl font-black text-primary-yellow">100+</div>
                <div className="text-white/80">Recettes</div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary-yellow">5★</div>
                <div className="text-white/80">Note</div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary-yellow">15min</div>
                <div className="text-white/80">Préparation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <SpecialOfferBanner />

      {/* Features - Enhanced Cards */}
      <section className="py-32 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-red font-bold uppercase tracking-wider text-sm">
              Nos Atouts
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-charcoal mb-4 mt-2">
              Pourquoi Pizza Falchi ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tradition • Qualité • Proximité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
              <div className="bg-white p-5 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Truck className="w-8 h-8 text-gray-600 group-hover:text-primary-red transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal group-hover:text-primary-red transition-colors">Food Truck</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Retrouvez-nous dans les meilleurs spots de votre région
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
              <div className="bg-white p-5 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Clock className="w-8 h-8 text-gray-600 group-hover:text-primary-yellow transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal group-hover:text-primary-yellow transition-colors">15 Minutes</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Préparation rapide et service express pour vous
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
              <div className="bg-white p-5 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Star className="w-8 h-8 text-gray-600 group-hover:text-basil-light transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal group-hover:text-basil-light transition-colors">Frais & Bio</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Ingrédients de saison, frais et locaux
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
              <div className="bg-white p-5 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <ChefHat className="w-8 h-8 text-gray-600 group-hover:text-primary-red transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal group-hover:text-primary-red transition-colors">Savoir-Faire</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                3 générations de passion italienne
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section - Clean & Simple */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image - Clean & Large */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/home-img.avif"
                  alt="Pizza Falchi - Nos Pizzas Artisanales"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Simple badge */}
              <div className="absolute -bottom-8 -right-8 bg-primary-red text-white px-8 py-4 rounded-2xl font-black text-xl shadow-xl">
                100% Artisanal
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-primary-red font-bold uppercase tracking-wider text-sm">
                Notre Spécialité
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-charcoal mt-4 mb-6 leading-tight">
                Pizzas
                <span className="block text-primary-red">Authentiques</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Chaque pizza est préparée avec des ingrédients sélectionnés directement d'Italie. Notre pâte fermente 48 heures pour une texture légère et croustillante.
              </p>

              {/* Clean features */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-soft-red-lighter rounded-xl flex items-center justify-center text-2xl">
                    🇮🇹
                  </div>
                  <p className="text-lg font-semibold text-charcoal">Recettes napolitaines authentiques</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-soft-yellow-lighter rounded-xl flex items-center justify-center text-2xl">
                    ⏱️
                  </div>
                  <p className="text-lg font-semibold text-charcoal">Pâte fermentée 48h</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-soft-red-lighter rounded-xl flex items-center justify-center text-2xl">
                    🔥
                  </div>
                  <p className="text-lg font-semibold text-charcoal">Cuisson au feu de bois</p>
                </div>
              </div>

              <Link
                href="/menu"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-red to-primary-red-dark hover:from-primary-yellow hover:to-primary-red text-white hover:text-charcoal px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Découvrir le Menu
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Hero Style */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-700 to-gray-900 py-32 md:py-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-red/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-primary-red text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-xl">
              Commandez maintenant
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            Prêt à <span className="text-primary-yellow drop-shadow-lg">commander</span> ?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Découvrez notre menu et savourez l'authenticité italienne. Des pizzas artisanales préparées avec passion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-red to-primary-yellow hover:from-primary-yellow hover:to-primary-red text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-primary-yellow/50 hover:scale-105"
            >
              Voir le Menu
              <Pizza className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 border-2 border-white bg-white/10 backdrop-blur text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-charcoal transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Nous Contacter
              <span>→</span>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
              <div className="text-3xl font-black text-primary-yellow mb-1">100+</div>
              <div className="text-white/80 text-sm">Recettes Artisanales</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
              <div className="text-3xl font-black text-primary-yellow mb-1">⭐ 4.9</div>
              <div className="text-white/80 text-sm">Note Moyenne</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
              <div className="text-3xl font-black text-primary-yellow mb-1">15min</div>
              <div className="text-white/80 text-sm">Préparation Rapide</div>
            </div>
          </div>
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.05) 20px, rgba(255,255,255,.05) 40px)'
        }}></div>
      </section>
    </div>
  );
}