'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Package, Truck, User, Phone, Mail, MapPin, CreditCard, FileText, ShoppingBag, ArrowLeft, Check, Loader2, Banknote, Globe } from 'lucide-react';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from '@/components/checkout/StripePaymentForm';
import toast from 'react-hot-toast';
import { SPACING, ROUNDED, SHADOWS, TRANSITIONS } from '@/lib/design-constants';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  // Form state
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'France',
    paymentMethod: 'cash' as 'cash' | 'card' | 'online',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0) {
      router.push('/menu');
    }
  }, [items, router]);

  const subtotal = getTotal();
  const total = subtotal;

  // Create payment intent when online payment is selected
  useEffect(() => {
    if (formData.paymentMethod === 'online' && !clientSecret && total > 0) {
      createPaymentIntent();
    }
  }, [formData.paymentMethod, total]);

  const createPaymentIntent = async () => {
    setIsLoadingPayment(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Erreur lors de l\'initialisation du paiement');
    } finally {
      setIsLoadingPayment(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Le nom est requis';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (deliveryType === 'delivery') {
      if (!formData.street.trim()) newErrors.street = 'Adresse requise';
      if (!formData.city.trim()) newErrors.city = 'Ville requise';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Code postal requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    // For online payment, the form submission is handled by Stripe
    if (formData.paymentMethod === 'online') {
      return;
    }

    await submitOrder();
  };

  const submitOrder = async (paymentIntentId?: string) => {
    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        deliveryType,
        deliveryAddress: deliveryType === 'delivery' ? {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        } : undefined,
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          customizations: item.customizations,
          total: item.product.price * item.quantity
        })),
        subtotal,
        tax: 0,
        deliveryFee: 0,
        total,
        paymentMethod: formData.paymentMethod,
        paymentIntentId,
        notes: formData.notes
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la commande');
      }

      const order = await response.json();

      // Clear cart
      clearCart();

      // Redirect to confirmation page
      toast.success('Commande créée avec succès !');
      router.push(`/order-confirmation/${order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripeSuccess = async () => {
    await submitOrder();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentMethodChange = (method: 'cash' | 'card' | 'online') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
    if (method !== 'online') {
      setClientSecret(null);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-white to-primary-yellow/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary-red hover:text-primary-red-dark transition font-semibold mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Retour au panier
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            Finaliser la <span className="bg-gradient-to-r from-primary-red to-soft-red bg-clip-text text-transparent">Commande</span>
          </h1>
          <p className="text-xl text-gray-600">
            Plus qu'une étape avant de déguster vos délicieuses pizzas !
          </p>
        </div>

        <form onSubmit={handleSubmit} className={`grid lg:grid-cols-3 ${SPACING.cardGap}`}>
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Type Selection */}
            <div className={`bg-white ${ROUNDED.xl} ${SPACING.cardPaddingLg} ${SHADOWS.md} border border-gray-100`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-primary-red/10 p-2 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-primary-red" />
                </div>
                Mode de récupération
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                    deliveryType === 'pickup'
                      ? 'border-primary-red bg-gradient-to-br from-primary-red/5 to-primary-red/10 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {deliveryType === 'pickup' && (
                    <div className="absolute top-3 right-3 bg-primary-red text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <Package className={`w-10 h-10 mb-3 ${deliveryType === 'pickup' ? 'text-primary-red' : 'text-gray-400'}`} />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">À Emporter</h3>
                  <p className="text-sm text-gray-600 mb-2">Retrait sur place</p>
                  <p className="text-primary-red font-bold text-lg">Gratuit</p>
                </button>

                <button
                  type="button"
                  disabled
                  className="relative p-6 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                >
                  <div className="absolute top-3 right-3 bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Bientôt
                  </div>
                  <Truck className="w-10 h-10 mb-3 text-gray-400" />
                  <h3 className="text-lg font-bold text-gray-500 mb-1">Livraison</h3>
                  <p className="text-sm text-gray-400 mb-2">Temporairement indisponible</p>
                  <p className="font-bold text-lg text-gray-400">
                    {subtotal >= 30 ? 'Gratuit !' : '5,00€'}
                  </p>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className={`bg-white ${ROUNDED.xl} ${SPACING.cardPaddingLg} ${SHADOWS.md} border border-gray-100`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-primary-red/10 p-2 rounded-xl">
                  <User className="w-6 h-6 text-primary-red" />
                </div>
                Vos informations
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet <span className="text-primary-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.customerName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    } focus:ring-2 focus:ring-primary-red focus:border-primary-red transition`}
                    placeholder="Jean Dupont"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span> {errors.customerName}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Téléphone <span className="text-primary-red">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      } focus:ring-2 focus:ring-primary-red focus:border-primary-red transition`}
                      placeholder="06 12 34 56 78"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email <span className="text-gray-400 text-xs">(optionnel)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      } focus:ring-2 focus:ring-primary-red focus:border-primary-red transition`}
                      placeholder="jean.dupont@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address (conditional) */}
            {deliveryType === 'delivery' && (
              <div className={`bg-white ${ROUNDED.xl} ${SPACING.cardPaddingLg} ${SHADOWS.md} border border-gray-100`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="bg-primary-red/10 p-2 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary-red" />
                  </div>
                  Adresse de livraison
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Rue et numéro <span className="text-primary-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.street ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      } focus:ring-2 focus:ring-primary-red focus:border-primary-red transition`}
                      placeholder="123 Rue de la Pizza"
                    />
                    {errors.street && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.street}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Code postal <span className="text-primary-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.postalCode ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        } focus:ring-2 focus:ring-primary-red focus:border-primary-red transition`}
                        placeholder="13000"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <span>⚠️</span> {errors.postalCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Ville <span className="text-primary-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        } focus:ring-2 focus:ring-primary-red focus:border-primary-red transition`}
                        placeholder="Aix-en-Provence"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <span>⚠️</span> {errors.city}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className={`bg-white ${ROUNDED.xl} ${SPACING.cardPaddingLg} ${SHADOWS.md} border border-gray-100`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-primary-red/10 p-2 rounded-xl">
                  <CreditCard className="w-6 h-6 text-primary-red" />
                </div>
                Mode de paiement
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('cash')}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-200 ${
                    formData.paymentMethod === 'cash'
                      ? 'border-primary-red bg-gradient-to-br from-primary-red/5 to-primary-red/10 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {formData.paymentMethod === 'cash' && (
                    <div className="absolute top-2 right-2 bg-primary-red text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <div className="flex items-center justify-center mb-2">
                    <Banknote className="w-8 h-8 text-primary-red" />
                  </div>
                  <p className="font-bold text-gray-900">Espèces</p>
                  <p className="text-xs text-gray-500 mt-1">À la livraison</p>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('card')}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-200 ${
                    formData.paymentMethod === 'card'
                      ? 'border-primary-red bg-gradient-to-br from-primary-red/5 to-primary-red/10 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {formData.paymentMethod === 'card' && (
                    <div className="absolute top-2 right-2 bg-primary-red text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <div className="flex items-center justify-center mb-2">
                    <CreditCard className="w-8 h-8 text-primary-red" />
                  </div>
                  <p className="font-bold text-gray-900">Carte</p>
                  <p className="text-xs text-gray-500 mt-1">À la livraison</p>
                </button>

                <button
                  type="button"
                  disabled
                  className="relative p-5 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                >
                  <div className="absolute top-2 right-2 bg-gray-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    Bientôt
                  </div>
                  <div className="flex items-center justify-center mb-2 opacity-50">
                    <Globe className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-bold text-gray-500">En ligne</p>
                  <p className="text-xs text-gray-400 mt-1">Temporairement indisponible</p>
                </button>
              </div>

              {/* Stripe Payment Form */}
              {formData.paymentMethod === 'online' && (
                <div>
                  {isLoadingPayment ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-red" />
                    </div>
                  ) : clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripePaymentForm onSuccess={handleStripeSuccess} total={total} />
                    </Elements>
                  ) : null}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className={`bg-white ${ROUNDED.xl} ${SPACING.cardPaddingLg} ${SHADOWS.md} border border-gray-100`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-primary-red/10 p-2 rounded-xl">
                  <FileText className="w-6 h-6 text-primary-red" />
                </div>
                Notes <span className="text-gray-400 text-base font-normal">(optionnel)</span>
              </h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-red focus:border-primary-red transition resize-none"
                placeholder="Instructions spéciales, allergies, préférences de cuisson..."
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                <span>Récapitulatif</span>
                <div className="bg-primary-red/10 p-2 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-primary-red" />
                </div>
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-600">Qté: {item.quantity} × {item.product.price.toFixed(2)}€</p>
                    </div>
                    <p className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total (TTC)</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-xl font-black text-gray-900">Total TTC</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-primary-red to-soft-red bg-clip-text text-transparent">
                    {total.toFixed(2)}€
                  </span>
                </div>
              </div>

              {/* Submit Button - Only for cash/card payments */}
              {formData.paymentMethod !== 'online' && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-red to-soft-red hover:from-primary-red-dark hover:to-primary-red text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Traitement...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-6 h-6" />
                      <span>Confirmer la commande</span>
                    </>
                  )}
                </button>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                En confirmant, vous acceptez nos conditions générales
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
