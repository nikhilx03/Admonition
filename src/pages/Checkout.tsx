import React, { useState, useEffect } from 'react';
import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

function MockCheckoutForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('Payment successful! (Mock)');
      navigate('/');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-orange-50 text-orange-800 rounded-xl border border-orange-200 mb-6">
        <p className="font-medium">Demo Mode Active</p>
        <p className="text-sm mt-1">Stripe keys are not configured. This is a simulated checkout.</p>
      </div>
      
      <button
        disabled={isProcessing}
        className="w-full flex items-center justify-center rounded-xl border border-transparent bg-stone-900 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...
          </>
        ) : (
          'Pay Now (Mock)'
        )}
      </button>
    </form>
  );
}

function StripeCheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-success`,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message ?? 'An unknown error occurred');
      setIsProcessing(false);
    } else {
      clearCart();
      alert('Payment successful!');
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full flex items-center justify-center rounded-xl border border-transparent bg-stone-900 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
}

export function Checkout() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          // Fallback to mock if backend doesn't have stripe configured
          setClientSecret('mock_secret');
        }
      } catch (error) {
        console.error('Error fetching payment intent:', error);
        setClientSecret('mock_secret'); // Fallback for demo
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [items, navigate]);

  const shipping = totalPrice > 100 ? 0 : 10;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin h-10 w-10 text-stone-400" />
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </button>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 flex items-center">
              <ShieldCheck className="mr-3 h-6 w-6 text-green-600" /> Secure Checkout
            </h2>

            {clientSecret === 'mock_secret' ? (
              <MockCheckoutForm />
            ) : clientSecret ? (
              <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                <StripeCheckoutForm clientSecret={clientSecret} />
              </Elements>
            ) : null}
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-3xl px-6 py-8 sm:p-10 border border-stone-100 shadow-sm sticky top-24">
              <h3 className="text-lg font-serif font-bold text-stone-900 mb-6">Order Summary</h3>
              
              <ul className="divide-y divide-stone-100 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex items-center">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover border border-stone-100" referrerPolicy="no-referrer" />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 text-sm text-stone-600 border-t border-stone-100 pt-6">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-stone-900">${totalPrice.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-stone-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax</dt>
                  <dd className="font-medium text-stone-900">${tax.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                  <dt className="text-base font-bold text-stone-900">Total</dt>
                  <dd className="text-xl font-bold text-stone-900">${finalTotal.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
