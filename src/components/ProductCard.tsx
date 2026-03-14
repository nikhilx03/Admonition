import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../store/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
            Featured
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-stone-500 uppercase tracking-wider font-medium">{product.category}</p>
          <div className="flex items-center text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs text-stone-600 ml-1 font-medium">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-semibold text-stone-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-stone-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <span className="text-lg font-bold text-stone-900">₹{product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex items-center justify-center bg-stone-100 hover:bg-stone-900 text-stone-900 hover:text-white p-2.5 rounded-full transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
