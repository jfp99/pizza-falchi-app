import Link from 'next/link';
import Image from 'next/image';
import { Pizza, Truck, Clock, Star, ChefHat, Award, Heart, MapPin } from 'lucide-react';

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
                className="bg-primary-red hover:bg-primary-red-dark text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-center"
              >
                Voir le Menu
              </Link>

              <Link
                href="/contact"
                className="border-2 border-white bg-white/10 backdrop-blur text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-charcoal transition-all duration-300 text-center"
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

      {/* Features - Clean Cards */}
      <section className="py-32 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-charcoal mb-6">
              Pourquoi Pizza Falchi ?
            </h2>
            <p className="text-2xl text-gray-600">
              Tradition • Qualité • Proximité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-red p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Food Truck</h3>
              <p className="text-gray-600 leading-relaxed">
                Retrouvez-nous dans les meilleurs spots
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-yellow p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">15 Minutes</h3>
              <p className="text-gray-600 leading-relaxed">
                Préparation rapide et service express
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-basil-light p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Frais & Bio</h3>
              <p className="text-gray-600 leading-relaxed">
                Ingrédients de saison et locaux
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-red p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Savoir-Faire</h3>
              <p className="text-gray-600 leading-relaxed">
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
                className="inline-flex items-center gap-3 bg-primary-red hover:bg-primary-red-dark text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300"
              >
                Découvrir le Menu
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean */}
      <section className="py-32 bg-primary-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Prêt à commander ?
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Découvrez notre menu et savourez l'Italie
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-white text-primary-red px-12 py-6 rounded-2xl font-bold text-xl hover:bg-primary-yellow transition-all duration-300"
          >
            Voir le Menu
            <Pizza className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}