'use client';
import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Loader2, CreditCard, Shield } from 'lucide-react';

interface StripePaymentFormProps {
  onSuccess: () => void;
  total: number;
}

export default function StripePaymentForm({ onSuccess, total }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Une erreur est survenue');
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setErrorMessage('Une erreur inattendue est survenue');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Element Container */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-red/10 p-2 rounded-xl">
            <CreditCard className="w-5 h-5 text-primary-red" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Informations de paiement</h3>
        </div>

        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 font-medium text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <Shield className="w-4 h-4 text-green-600" />
        <span>Paiement sécurisé par Stripe</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full bg-gradient-to-r from-primary-red to-soft-red hover:from-primary-red-dark hover:to-primary-red text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Traitement en cours...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-6 h-6" />
            <span>Payer {total.toFixed(2)}€</span>
          </>
        )}
      </button>
    </form>
  );
}
