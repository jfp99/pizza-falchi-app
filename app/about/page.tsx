import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Award, Clock, MapPin, Phone, Mail, ChefHat, Flame, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Clean */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <span className="bg-primary-red text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              Notre Histoire
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-6">
            L'Art de la <span className="text-primary-red">Pizza Italienne</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Une passion transmise de génération en génération, depuis les ruelles de Naples jusqu'à votre quartier
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="relative w-16 h-16 mb-6">
                  <Image
                    src="/images/logo-pizzafalchi.avif"
                    alt="Pizza Falchi Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden">
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

            {/* Content */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-4xl font-black text-charcoal mb-6">
                  Une Histoire de Famille
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Tout a commencé dans une petite pizzeria de Naples, où notre grand-père <span className="font-bold text-primary-red">Giuseppe Falchi</span> perfectionnait son art depuis l'âge de 14 ans. La recette secrète de sa pâte, pétrie à la main chaque matin, est devenue légendaire dans le quartier.
                  </p>
                  <p>
                    En 2020, nous avons décidé de partager cette tradition avec la France. Armés d'un four à bois artisanal et de notre passion pour l'authenticité, <span className="font-bold text-primary-red">Pizza Falchi</span> est né : un food truck qui apporte les saveurs de l'Italie directement dans votre quartier.
                  </p>
                  <p>
                    Chaque pizza est préparée avec des <span className="font-bold text-basil-light">ingrédients importés d'Italie</span> : tomates San Marzano, mozzarella di bufala, basilic frais et huile d'olive extra vierge. Notre pâte fermente pendant 48 heures pour une texture légère et croustillante, exactement comme à Naples.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ce qui nous anime au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-warm-cream p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-red p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Passion</h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque pizza est préparée avec amour et dévouement, comme si nous la faisions pour notre propre famille
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-warm-cream p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-yellow p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Qualité</h3>
              <p className="text-gray-600 leading-relaxed">
                Ingrédients 100% italiens, sélectionnés avec soin auprès de producteurs de confiance
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-warm-cream p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-basil-light p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Authenticité</h3>
              <p className="text-gray-600 leading-relaxed">
                Recettes traditionnelles napolitaines respectées à la lettre, sans compromis
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-warm-cream p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-yellow p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-charcoal">Proximité</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous nous déplaçons dans votre quartier pour vous offrir une expérience unique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
              L'Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les artisans derrière vos pizzas préférées
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-32 h-32 bg-primary-red rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl">👨‍🍳</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Marco Falchi</h3>
              <p className="text-primary-red font-semibold mb-4">Chef Pizzaiolo</p>
              <p className="text-gray-600 leading-relaxed">
                15 ans d'expérience, formé à Naples. Gardien de nos recettes familiales traditionnelles.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-32 h-32 bg-primary-yellow rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl">👩‍🍳</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Sofia Rossi</h3>
              <p className="text-primary-yellow-dark font-semibold mb-4">Chef Pâtissière</p>
              <p className="text-gray-600 leading-relaxed">
                Experte en desserts italiens, elle crée nos tiramisu et panna cotta maison avec passion.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-32 h-32 bg-basil-light rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl">🚚</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Luca Bianchi</h3>
              <p className="text-basil-light font-semibold mb-4">Manager</p>
              <p className="text-gray-600 leading-relaxed">
                Responsable de nos déplacements et de l'organisation. Il connaît tous les meilleurs spots !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary-red rounded-3xl p-12 md:p-16 text-center shadow-xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-12">
              Pizza Falchi en Chiffres
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-yellow mb-2">5000+</div>
                <div className="text-white font-medium">Pizzas Servies</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-yellow mb-2">4.9★</div>
                <div className="text-white font-medium">Note Moyenne</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-yellow mb-2">100%</div>
                <div className="text-white font-medium">Ingrédients Italiens</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-yellow mb-2">3</div>
                <div className="text-white font-medium">Générations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Flame className="w-20 h-20 text-primary-red mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
            Prêt à goûter l'authentique pizza italienne ?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Découvrez nos créations et commandez dès maintenant
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/menu"
              className="bg-primary-red hover:bg-primary-red-dark text-white px-10 py-5 rounded-2xl font-bold transition-all text-lg inline-flex items-center justify-center gap-2"
            >
              Voir le Menu
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-primary-red bg-white text-charcoal px-10 py-5 rounded-2xl font-bold hover:bg-primary-red hover:text-white transition-all text-lg inline-flex items-center justify-center gap-2"
            >
              Nous Contacter
              <Phone className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
