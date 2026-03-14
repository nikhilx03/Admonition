import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Kitchen"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight mb-6">
              Elevate Your <br className="hidden md:block" /> Culinary Space
            </h1>
            <p className="mt-4 text-xl text-stone-200 max-w-2xl mx-auto mb-10 font-light">
              Discover thoughtfully designed kitchenware that blends timeless aesthetics with everyday functionality.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-stone-900 bg-white hover:bg-stone-100 transition-colors duration-300 shadow-lg"
              >
                Shop Collection
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6"
            >
              <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-900">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Free Shipping</h3>
              <p className="text-stone-500">On all orders over ₹1000 within India.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center p-6"
            >
              <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-900">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Lifetime Warranty</h3>
              <p className="text-stone-500">We stand behind the quality of our products forever.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center p-6"
            >
              <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-900">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Easy Returns</h3>
              <p className="text-stone-500">30-day hassle-free return policy on all unused items.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Featured Essentials</h2>
              <p className="text-stone-500 max-w-2xl">Curated pieces that form the foundation of a well-equipped kitchen.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=2000" 
            alt="Texture" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Art of Cooking</h2>
          <p className="text-lg text-stone-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            "Cooking is not a chore, it is a joy. The right tools don't just make the job easier, they make the experience richer."
          </p>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-full text-stone-900 bg-white hover:bg-stone-100 transition-colors duration-300"
          >
            Read Our Philosophy
          </Link>
        </div>
      </section>
    </div>
  );
}
