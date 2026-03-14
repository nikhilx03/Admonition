import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Shop Collection</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Explore our thoughtfully curated selection of kitchenware and household essentials.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-stone-200 rounded-xl leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-shadow"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            {/* Category Filter */}
            <div className="relative flex items-center w-full sm:w-auto">
              <Filter className="h-5 w-5 text-stone-400 absolute left-3" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 text-base border-stone-200 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-xl bg-stone-50 border appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-stone-500 absolute right-3 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative flex items-center w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-4 pr-10 py-2.5 text-base border-stone-200 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-xl bg-stone-50 border appearance-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="h-4 w-4 text-stone-500 absolute right-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-stone-100">
            <Search className="h-12 w-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-900 mb-2">No products found</h3>
            <p className="text-stone-500">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 text-orange-600 font-medium hover:text-orange-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
