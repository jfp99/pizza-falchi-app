import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Enhanced with Gradient */}
      <section className="relative bg-gradient-to-r from-charcoal via-gray-800 to-charcoal py-24 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-primary-red rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-yellow rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-soft-red rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-32 left-12 text-white/5 text-6xl animate-bounce" style={{animationDuration: '3s'}}>
              <Phone className="w-16 h-16" />
            </div>
            <div className="absolute bottom-32 right-12 text-white/5 text-6xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
              <Mail className="w-16 h-16" />
            </div>
            <div className="absolute top-1/2 right-24 text-white/5 text-6xl animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>
              <MessageSquare className="w-16 h-16" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6 backdrop-blur-md bg-primary-red/90 rounded-full px-6 py-2 border border-primary-red shadow-lg">
            <span className="text-white text-sm font-bold uppercase tracking-wider">
              Contactez-nous
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            Restons en <span className="text-primary-yellow drop-shadow-lg">Contact</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg font-medium mb-10">
            Une question ? Une suggestion ? Nous sommes à votre écoute !
          </p>

          {/* Quick Contact Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+33442920308"
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              <span>Appelez-nous</span>
            </a>
            <a
              href="mailto:pizzafalchipro@gmail.com"
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Envoyez un mail</span>
            </a>
          </div>
        </div>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#FFF9F0"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4">
          {/* Map Section */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.426430988316!2d5.418354712321976!3d43.57683337098537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c98c9a1aea85bb%3A0x7c03b9a5f1f1d9fb!2sPizza%20Falchi!5e0!3m2!1sfr!2sfr!4v1760007377500!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>

          {/* Contact Info Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-red p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal mb-2">Adresse</h3>
                    <p className="text-lg text-gray-700 font-medium mb-2">
                      Pizza Falchi
                    </p>
                    <p className="text-gray-600">
                      615, avenue de la Touloubre<br />
                      13540 Puyricard - Aix en Provence
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-yellow p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-charcoal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal mb-2">Téléphone</h3>
                    <a href="tel:+33442920308" className="text-lg text-primary-red hover:text-primary-red-dark transition font-semibold block mb-2">
                      04 42 92 03 08
                    </a>
                    <p className="text-gray-600 text-sm">
                      Appelez-nous pour vos commandes et réservations
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="bg-basil-light p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal mb-2">Email</h3>
                    <a href="mailto:pizzafalchipro@gmail.com" className="text-lg text-primary-red hover:text-primary-red-dark transition font-semibold block mb-2">
                      pizzafalchipro@gmail.com
                    </a>
                    <p className="text-gray-600 text-sm">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
                <h3 className="text-2xl font-bold mb-4 text-charcoal">Suivez-nous</h3>
                <p className="text-gray-600 mb-6">Restez informé de nos déplacements et nouveautés !</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:scale-110 p-4 rounded-2xl transition-all shadow-lg"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-600 hover:bg-blue-700 hover:scale-110 p-4 rounded-2xl transition-all shadow-lg"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-sky-500 hover:bg-sky-600 hover:scale-110 p-4 rounded-2xl transition-all shadow-lg"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Schedule */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary-yellow p-4 rounded-2xl">
                    <Clock className="w-7 h-7 text-charcoal" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal">Horaires d'ouverture</h3>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Lundi</span>
                    <span className="text-gray-500 italic">Fermé</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Mardi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Mercredi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Jeudi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Vendredi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Samedi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 hover:bg-gray-50 px-2 rounded transition-colors">
                    <span className="font-semibold text-charcoal">Dimanche</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-charcoal mb-4">Informations pratiques</h3>
                <div className="space-y-3 text-gray-700 flex-1">
                  <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                    <span className="text-primary-red mt-1 text-xl">✓</span>
                    <p>Commandes par téléphone acceptées</p>
                  </div>
                  <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                    <span className="text-primary-red mt-1 text-xl">✓</span>
                    <p>Paiement CB et espèces</p>
                  </div>
                  <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                    <span className="text-primary-red mt-1 text-xl">✓</span>
                    <p>Service sur place et à emporter</p>
                  </div>
                  <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                    <span className="text-primary-red mt-1 text-xl">✓</span>
                    <p>Possibilité de réservation pour groupes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - HIDDEN FOR NOW */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-warm-cream rounded-3xl p-12 shadow-lg text-center">
            <Calendar className="w-20 h-20 text-primary-red mx-auto mb-6" />
            <h2 className="text-4xl font-black text-charcoal mb-6">
              Organisez un Événement avec Nous
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Anniversaires, mariages, événements d'entreprise... Notre food truck peut venir chez vous !
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl font-black text-primary-red mb-2">50+</div>
                <div className="text-charcoal font-medium">Personnes minimum</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl font-black text-primary-yellow mb-2">Menu</div>
                <div className="text-charcoal font-medium">Personnalisable</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl font-black text-basil-light mb-2">100%</div>
                <div className="text-charcoal font-medium">Satisfaction</div>
              </div>
            </div>
            <a
              href="mailto:contact@pizzafalchi.com?subject=Demande d'événement"
              className="inline-flex items-center gap-3 bg-primary-red hover:bg-primary-red-dark text-white px-10 py-5 rounded-2xl font-bold transition-all"
            >
              Demander un Devis
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-warm-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Les réponses à vos questions les plus courantes
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                Où puis-je vous trouver cette semaine ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Notre planning hebdomadaire est mis à jour chaque dimanche sur nos réseaux sociaux (Instagram et Facebook). Vous pouvez aussi nous appeler au +33 1 23 45 67 89 pour connaître notre emplacement du jour.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                Proposez-vous la livraison à domicile ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Pour l'instant, nous fonctionnons uniquement en food truck. Cependant, vous pouvez commander par téléphone et venir récupérer votre commande sur place. Nous travaillons sur un service de livraison pour bientôt !
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                Avez-vous des options végétariennes et sans gluten ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Oui ! Nous proposons plusieurs pizzas végétariennes (Margherita, 4 Fromages, Végétarienne...). Pour les options sans gluten, merci de nous prévenir 24h à l'avance car nous utilisons une pâte spéciale préparée séparément.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                Puis-je réserver pour un grand groupe ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolument ! Pour les groupes de plus de 10 personnes, nous vous recommandons de passer commande à l'avance par téléphone. Cela nous permet de vous garantir les meilleures conditions de service et d'éviter l'attente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Softer Version */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-red-lighter rounded-2xl mb-4">
            <span className="text-3xl">🍕</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
            Vous avez faim ?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre menu et commandez vos pizzas artisanales préférées
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-primary-red hover:bg-primary-red-dark text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Voir le Menu
              <span>→</span>
            </Link>
            <Link
              href="tel:+33442920308"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-red bg-white text-primary-red px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-red hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Appelez-nous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
