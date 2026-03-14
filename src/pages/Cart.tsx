import { Link } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

export function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-stone-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 bg-white rounded-3xl shadow-sm border border-stone-100 max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-10 w-10 text-stone-300" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Your Cart is Empty</h2>
          <p className="text-stone-500 mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-stone-900 hover:bg-stone-800 transition-colors w-full"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-10">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover object-center sm:w-32 sm:h-32 border border-stone-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-stone-900">
                            <Link to={`/product/${item.id}`} className="hover:text-orange-600 transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-stone-500">{item.category}</p>
                        <p className="mt-1 text-sm font-medium text-stone-900">₹{item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center justify-between sm:justify-end">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 text-stone-900 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="absolute top-0 right-0 sm:relative sm:ml-6">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="-m-2 p-2 inline-flex text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 flex text-sm text-stone-700 space-x-2">
                      <span className="font-medium">Total:</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex justify-between">
              <Link to="/shop" className="text-stone-600 hover:text-stone-900 font-medium flex items-center transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <section className="mt-16 bg-white rounded-3xl px-6 py-8 sm:p-10 lg:col-span-5 xl:col-span-4 lg:mt-0 border border-stone-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">Order Summary</h2>

            <dl className="space-y-4 text-sm text-stone-600">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-stone-900">₹{totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <dt className="flex items-center">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="font-medium text-stone-900">{totalPrice > 100 ? 'Free' : '₹100.00'}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <dt className="flex text-stone-900">Tax estimate</dt>
                <dd className="font-medium text-stone-900">₹{(totalPrice * 0.08).toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <dt className="text-base font-bold text-stone-900">Order total</dt>
                <dd className="text-xl font-bold text-stone-900">
                  ₹{(totalPrice + (totalPrice > 100 ? 0 : 100) + (totalPrice * 0.08)).toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button
                disabled
                className="w-full flex items-center justify-center rounded-xl border border-transparent bg-stone-400 px-6 py-4 text-base font-medium text-white shadow-sm cursor-not-allowed"
              >
                Proceed to Checkout (Coming Soon)
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
