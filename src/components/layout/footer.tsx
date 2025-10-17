// components/layout/footer.tsx
import { Sparkle, Instagram, Facebook, Twitter, Mail, Phone, MapPin, CheckCircle, Leaf, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Sparkle className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent">
                Glamora
              </span>
            </div>
            <p className="text-dark-text-secondary mb-6 leading-relaxed">
              Discover vibrant, clean cosmetics crafted with purpose and passion. 
              Where every product tells our story of sustainable beauty.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-dark-text-secondary hover:text-primary-400 hover:bg-primary-400/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-dark-text-secondary hover:text-primary-400 hover:bg-primary-400/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-dark-text-secondary hover:text-primary-400 hover:bg-primary-400/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-dark-text-primary mb-6 text-lg">Shop</h3>
            <ul className="space-y-3 text-dark-text-secondary">
              <li>
                <Link href="/products" className="hover:text-primary-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=skincare" className="hover:text-primary-400 transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/products?category=makeup" className="hover:text-primary-400 transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link href="/products?category=hair" className="hover:text-primary-400 transition-colors">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link href="/products?category=bath" className="hover:text-primary-400 transition-colors">
                  Bath & Body
                </Link>
              </li>
              <li>
                <Link href="/products?category=new" className="hover:text-primary-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="font-semibold text-dark-text-primary mb-6 text-lg">Customer Service</h3>
            <ul className="space-y-3 text-dark-text-secondary">
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-primary-400 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-primary-400 transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h3 className="font-semibold text-dark-text-primary mb-6 text-lg">Stay Connected</h3>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6 text-dark-text-secondary">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>+1 (555) 123-GLOW</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>hello@glamora.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span>123 Beauty Ave<br />San Francisco, CA 94102</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-dark-text-secondary">
                Get beauty tips and exclusive offers
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-dark-border border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                />
                <Button className="bg-primary-400 hover:bg-primary-500 text-white rounded-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-dark-border py-8">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-dark-text-secondary">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Cruelty Free</span>
            </div>
            <div className="flex items-center gap-2 text-dark-text-secondary">
              <Leaf className="h-5 w-5 text-green-500" />
              <span className="text-sm">100% Vegan</span>
            </div>
            <div className="flex items-center gap-2 text-dark-text-secondary">
              <Recycle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Sustainable Packaging</span>
            </div>
            <div className="flex items-center gap-2 text-dark-text-secondary">
              <Sparkle className="h-5 w-5 text-primary-400" />
              <span className="text-sm">Clean Ingredients</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-dark-text-secondary text-sm">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-primary-400 transition-colors">
                Accessibility
              </Link>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Glamora Beauty. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}