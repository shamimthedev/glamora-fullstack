// src/app/page.tsx
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGrid } from "@/components/ecommerce/product-grid"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/api/products"
import { Sparkle, CheckCircle, Leaf, Recycle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Product } from "../../types/product"

// Add this to make the page dynamic
export const dynamic = 'force-dynamic'

export default async function Home() {
  let featuredProducts: Product[] = []
  
  try {
    featuredProducts = await getProducts({ limit: 6 })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    // Fallback to empty array if API fails
    featuredProducts = []
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-card dark:via-dark-bg dark:to-dark-border">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ff6b6b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] dark:bg-[radial-gradient(#ff6b6b_0.5px,transparent_0.5px)]" />
          
          <div className="container relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm mb-8">
              <Sparkle className="h-4 w-4 text-accent-500" />
              <span className="text-sm font-medium">Clean Beauty Revolution</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Beauty that
              <span className="bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent block mt-2">
                Speaks Volumes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover vibrant, clean cosmetics crafted with purpose and passion. 
              Where every product tells our story of sustainable beauty.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 text-lg rounded-full">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 px-8 py-3 text-lg rounded-full">
                Our Story
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500 dark:text-dark-text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cruelty Free
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                Vegan Formula
              </div>
              <div className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-green-500" />
                Sustainable Packaging
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white dark:bg-dark-bg">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="text-primary-400">Products</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
                Discover our best-selling clean beauty products loved by thousands
              </p>
            </div>
            
            <ProductGrid products={featuredProducts} />
            
            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}