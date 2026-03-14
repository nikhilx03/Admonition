import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../store/CartContext';
import { Star, ShieldCheck, Truck, ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Product Not Found</h2>
        <p className="text-stone-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="bg-white min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-stone-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-stone-300">/</span>
                <Link to="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-stone-300">/</span>
                <span className="text-stone-900 font-medium">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-3xl overflow-hidden bg-stone-100 mb-8 lg:mb-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <p className="text-sm text-orange-600 font-bold uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`} />
                ))}
              </div>
              <p className="ml-3 text-sm text-stone-500 font-medium">{product.rating} ({product.reviews} reviews)</p>
            </div>

            <p className="text-3xl text-stone-900 font-medium mb-8">₹{product.price.toFixed(2)}</p>

            <div className="prose prose-stone text-stone-600 mb-10">
              <p className="text-lg leading-relaxed">{product.description}</p>
              {product.link && (
                <p className="mt-4">
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium underline">
                    View original product on Flipkart
                  </a>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto border-t border-stone-100 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-500 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center text-stone-900 font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone-500 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center bg-stone-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-stone-800 transition-colors shadow-sm"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-stone-50 rounded-xl border border-stone-100">
                  <Truck className="h-6 w-6 text-stone-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">Free Shipping</p>
                    <p className="text-xs text-stone-500">On orders over ₹1000</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-stone-50 rounded-xl border border-stone-100">
                  <ShieldCheck className="h-6 w-6 text-stone-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">Lifetime Warranty</p>
                    <p className="text-xs text-stone-500">Quality guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
