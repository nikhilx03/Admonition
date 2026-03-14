import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-stone-600"
          >
            Have a question about our products, your order, or just want to say hello? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 lg:mb-0"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-100 h-full">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-stone-900" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-stone-900">Our Studio</h3>
                    <p className="mt-2 text-stone-600">
                      123 Artisan Way, Suite 100<br />
                      Portland, OR 97204<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-stone-900" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-stone-900">Phone</h3>
                    <p className="mt-2 text-stone-600">
                      1-800-555-0199<br />
                      Mon-Fri 9am to 5pm PST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-stone-900" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-stone-900">Email</h3>
                    <p className="mt-2 text-stone-600">
                      hello@admonition.com<br />
                      support@admonition.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-100">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Send us a Message</h2>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-200 text-center">
                  <h3 className="text-lg font-medium mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-green-700 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-stone-700 mb-2">First name</label>
                      <input
                        type="text"
                        id="first-name"
                        required
                        className="block w-full rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-stone-700 mb-2">Last name</label>
                      <input
                        type="text"
                        id="last-name"
                        required
                        className="block w-full rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="block w-full rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                    <select
                      id="subject"
                      className="block w-full rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option>General Inquiry</option>
                      <option>Order Status</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="block w-full rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 focus:border-orange-500 focus:ring-orange-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full flex items-center justify-center rounded-xl border border-transparent bg-stone-900 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : (
                      <>Send Message <Send className="ml-2 h-5 w-5" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
