import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section - Clean */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <span className="bg-primary-red text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              Contactez-nous
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-6">
            Restons en <span className="text-primary-red">Contact</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Une question ? Une suggestion ? Nous sommes à votre écoute !
          </p>
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
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-red p-4 rounded-2xl">
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

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-yellow p-4 rounded-2xl">
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

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-basil-light p-4 rounded-2xl">
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
              <div className="bg-primary-red rounded-3xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Suivez-nous</h3>
                <p className="text-white/90 mb-6">Restez informé de nos déplacements et nouveautés !</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Schedule */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary-yellow p-4 rounded-2xl">
                    <Clock className="w-7 h-7 text-charcoal" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal">Horaires d'ouverture</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-charcoal">Lundi</span>
                    <span className="text-gray-500 italic">Fermé</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-charcoal">Mardi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-charcoal">Mercredi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-charcoal">Jeudi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-charcoal">Vendredi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-charcoal">Samedi</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-semibold text-charcoal">Dimanche</span>
                    <span className="text-gray-600">18h00 - 21h30</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-warm-cream rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-charcoal mb-4">Informations pratiques</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-red mt-1">✓</span>
                    <p>Commandes par téléphone acceptées</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-red mt-1">✓</span>
                    <p>Paiement CB et espèces</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-red mt-1">✓</span>
                    <p>Service sur place et à emporter</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-red mt-1">✓</span>
                    <p>Possibilité de réservation pour groupes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
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
      </section>

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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6">
            Vous avez faim ?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Découvrez notre menu et commandez vos pizzas préférées
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-primary-red hover:bg-primary-red-dark text-white px-10 py-5 rounded-2xl font-bold transition-all text-lg"
          >
            Voir le Menu
            <span className="text-2xl">🍕</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
