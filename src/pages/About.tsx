import { motion } from 'motion/react';

export function About() {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight mb-6"
            >
              Crafting tools for the heart of your home.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-stone-600 leading-relaxed"
            >
              Admonition was born from a simple belief: the objects we use every day should bring joy, function flawlessly, and last a lifetime.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 lg:mb-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000" 
                alt="Our workshop" 
                className="rounded-3xl shadow-lg object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Our Philosophy</h2>
              <div className="prose prose-stone text-stone-600 space-y-6">
                <p>
                  In a world of disposable goods, we choose to create heirlooms. Every Admonition product is designed with intention, combining traditional craftsmanship with modern engineering.
                </p>
                <p>
                  We source the finest materials—from food-grade silicone to durable borosilicate glass and premium acrylic—ensuring that each piece not only performs exceptionally but also ages beautifully.
                </p>
                <p>
                  Cooking is an act of love. We want to provide you with the tools that make that act effortless and inspiring. Whether you're a seasoned chef or a weekend baker, our collection is designed to elevate your culinary journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
