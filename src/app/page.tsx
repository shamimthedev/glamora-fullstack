import { Header } from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkle, CheckCircle, Leaf, Recycle } from "lucide-react"

export default function Home() {
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
              <Button size="lg" className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 text-lg rounded-full">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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

        {/* Quick Color Test Section */}
        <section className="py-16 bg-white dark:bg-dark-bg">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Color Palette</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {/* Primary Color Card */}
              <div className="text-center">
                <div className="h-32 rounded-2xl bg-primary-400 mb-4 shadow-lg"></div>
                <h3 className="font-semibold">Alta Red</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Primary Brand</p>
              </div>
              
              {/* Accent Color Card */}
              <div className="text-center">
                <div className="h-32 rounded-2xl bg-accent-500 mb-4 shadow-lg"></div>
                <h3 className="font-semibold">Elegant Purple</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Accent Color</p>
              </div>
              
              {/* Success Color Card */}
              <div className="text-center">
                <div className="h-32 rounded-2xl bg-green-500 mb-4 shadow-lg"></div>
                <h3 className="font-semibold">Fresh Green</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Success/Trust</p>
              </div>
              
              {/* Dark Mode Card */}
              <div className="text-center">
                <div className="h-32 rounded-2xl bg-dark-card border border-dark-border mb-4 shadow-lg"></div>
                <h3 className="font-semibold">Dark Elegance</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Dark Mode</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}