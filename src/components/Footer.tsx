import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold text-white tracking-tight mb-4 block">
              Admonition.
            </Link>
            <p className="text-sm text-stone-400 mb-6">
              Elevating everyday living with thoughtfully designed kitchenware and household essentials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Cookware" className="text-sm hover:text-white transition-colors">Cookware</Link></li>
              <li><Link to="/shop?category=Bakeware" className="text-sm hover:text-white transition-colors">Bakeware</Link></li>
              <li><Link to="/shop?category=Cutlery" className="text-sm hover:text-white transition-colors">Cutlery</Link></li>
              <li><Link to="/shop?category=Accessories" className="text-sm hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-stone-400 shrink-0" />
                <span className="text-sm">123 Artisan Way, Suite 100<br />Portland, OR 97204</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-stone-400 shrink-0" />
                <span className="text-sm">1-800-555-0199</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-stone-400 shrink-0" />
                <span className="text-sm">hello@admonition.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Admonition Kitchenware. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-stone-500 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs text-stone-500 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
