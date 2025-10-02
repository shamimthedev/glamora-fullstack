import { Header } from "@/components/layout/header"
import { ProductGrid } from "@/components/ecommerce/product-grid"
import { Button } from "@/components/ui/button"
import { Filter, Grid3X3, List } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary-400">Products</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
              Discover our complete collection of clean, vibrant beauty products
            </p>
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2 rounded-full">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900 dark:text-dark-text-primary">24</span> products
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <select className="bg-transparent border-0 text-sm focus:ring-0">
                <option>Sort by: Featured</option>
                <option>Sort by: Price Low to High</option>
                <option>Sort by: Price High to Low</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Best Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid />

          {/* Load More */}
          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Load More Products
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}