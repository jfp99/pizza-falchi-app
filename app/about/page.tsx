import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Award, Clock, MapPin, Phone, Mail, ChefHat, Flame, Leaf } from 'lucide-react';
import SpecialOfferBanner from '@/components/promotions/SpecialOfferBanner';

export default function About() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Enhanced with Gradient */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-700 to-gray-900 py-24 md:py-32 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-red/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6 backdrop-blur-sm bg-primary-red/90 rounded-full px-6 py-2 border border-primary-red shadow-lg">
            <span className="text-white text-sm font-bold uppercase tracking-wider">
              Notre Histoire
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            L'Art de la <span className="text-primary-yellow drop-shadow-lg">Pizza Italienne</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg font-medium">
            Une passion transmise de génération en génération, depuis les ruelles de Naples jusqu'à votre quartier
          </p>
        </div>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#FFF9F0"/>
          </svg>
        </div>
      </section>

      {/* Special Offer Banner */}
      <SpecialOfferBanner />

      {/* Story Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Content */}
            <div className="flex">
              <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center h-full w-full">
                <h2 className="text-4xl font-black text-charcoal mb-6">
                  Une Histoire de Famille
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    En 2001, la pizzeria a vu le jour et depuis cette année-là les Falchi servent de délicieuses pizzas sur la commune de Puyricard. J'ai eu l'honneur de me joindre à cette aventure en 2014 et d'apprendre la confection de ces pizzas gourmandes dont je maîtrise désormais les secrets.
                  </p>
                  <p>
                    M. et Mme Falchi me font confiance pour la reprise de cette pizzeria et pour faire perdurer leurs recettes afin de continuer à régaler les habitants de Puyricard et de ses alentours.
                  </p>
                  <p>
                    Chaque pizza est préparée avec des <span className="font-bold text-basil-light">ingrédients importés d'Italie</span> : tomates San Marzano, mozzarella di bufala, basilic frais et huile d'olive extra vierge. Notre pâte fermente pendant 48 heures pour une texture légère et croustillante, exactement comme à Naples.
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex">
              <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col h-full w-full">
                <div className="relative w-16 h-16 mb-6">
                  <Image
                    src="/images/logo-pizzafalchi.avif"
                    alt="Pizza Falchi Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[300px]">
                  <Image
                    src="/images/about-img.avif"
                    alt="Pizza Falchi - Notre Histoire"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent flex items-end justify-center p-6">
                    <p className="text-white font-bold text-xl italic">Passione • Tradizione • Qualità</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ce qui nous anime au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-warm-cream p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-red p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">Passion</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Chaque pizza est préparée avec amour et dévouement, comme si nous la faisions pour notre propre famille
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-warm-cream p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gray-500 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">Qualité</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Ingrédients 100% italiens, sélectionnés avec soin auprès de producteurs de confiance
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-warm-cream p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-red p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">Authenticité</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Recettes traditionnelles napolitaines respectées à la lettre, sans compromis
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-warm-cream p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gray-500 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">Proximité</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Nous nous déplaçons dans votre quartier pour vous offrir une expérience unique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
              L'Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les artisans derrière vos pizzas préférées
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-24 h-24 bg-primary-red rounded-full mx-auto mb-5 flex items-center justify-center">
                <span className="text-5xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Marco Falchi</h3>
              <p className="text-primary-red font-semibold mb-3 text-sm">Chef Pizzaiolo</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                15 ans d'expérience, formé à Naples. Gardien de nos recettes familiales traditionnelles.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-24 h-24 bg-gray-500 rounded-full mx-auto mb-5 flex items-center justify-center">
                <span className="text-5xl">👩‍🍳</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Sofia Rossi</h3>
              <p className="text-gray-600 font-semibold mb-3 text-sm">Chef Pâtissière</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Experte en desserts italiens, elle crée nos tiramisu et panna cotta maison avec passion.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-24 h-24 bg-primary-red rounded-full mx-auto mb-5 flex items-center justify-center">
                <span className="text-5xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Luca Bianchi</h3>
              <p className="text-primary-red font-semibold mb-3 text-sm">Manager</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Responsable de nos déplacements et de l'organisation. Il connaît tous les meilleurs spots !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Hero Style */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-800 to-gray-900 py-24 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 bg-primary-red/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-primary-red text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-xl">
              Nos Réussites
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
            Pizza Falchi en <span className="text-primary-yellow drop-shadow-lg">Chiffres</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-lg">
            Des résultats qui témoignent de notre engagement et de votre confiance
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-primary-yellow mb-2 drop-shadow-lg">5000+</div>
              <div className="text-white/90 font-medium text-sm md:text-base">Pizzas Servies</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-primary-yellow mb-2 drop-shadow-lg">⭐ 4.9</div>
              <div className="text-white/90 font-medium text-sm md:text-base">Note Moyenne</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-primary-yellow mb-2 drop-shadow-lg">100%</div>
              <div className="text-white/90 font-medium text-sm md:text-base">Ingrédients Italiens</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black text-primary-yellow mb-2 drop-shadow-lg">3</div>
              <div className="text-white/90 font-medium text-sm md:text-base">Générations</div>
            </div>
          </div>
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.05) 20px, rgba(255,255,255,.05) 40px)'
        }}></div>
      </section>

      {/* CTA Section - Hero Style */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-700 to-gray-900 py-32 md:py-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-red/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-red rounded-full mb-6 shadow-2xl">
            <Flame className="w-10 h-10 text-white" />
          </div>

          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-primary-red text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-xl">
              Rejoignez-nous
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
            Prêt à goûter l'authentique <span className="text-primary-yellow drop-shadow-lg">pizza italienne</span> ?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Découvrez nos créations artisanales et commandez dès maintenant
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-red to-primary-yellow hover:from-primary-yellow hover:to-primary-red text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-primary-yellow/50 hover:scale-105"
            >
              Voir le Menu
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 border-2 border-white bg-white/10 backdrop-blur text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-charcoal transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Nous Contacter
              <Phone className="w-5 h-5" />
            </Link>
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
