import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-stone-300" />
                  </div>
                  <p className="text-stone-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-orange-600 font-medium hover:text-orange-700 hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-2">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-stone-900">
                            <h3 className="line-clamp-2 pr-4"><Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>{item.name}</Link></h3>
                            <p className="ml-4 whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-stone-500">{item.category}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border border-stone-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-l-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 text-stone-900 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-r-lg"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="font-medium text-stone-400 hover:text-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-stone-100 p-6 bg-stone-50">
                <div className="flex justify-between text-base font-medium text-stone-900 mb-4">
                  <p>Subtotal</p>
                  <p>₹{totalPrice.toFixed(2)}</p>
                </div>
                <p className="text-sm text-stone-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full flex items-center justify-center rounded-xl border border-transparent bg-stone-400 px-6 py-4 text-base font-medium text-white shadow-sm cursor-not-allowed"
                  >
                    Checkout (Coming Soon)
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-4 text-base font-medium text-stone-700 shadow-sm hover:bg-stone-50 transition-colors"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
