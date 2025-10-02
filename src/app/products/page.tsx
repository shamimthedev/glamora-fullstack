"use client"

import { Header } from "@/components/layout/header"
import { ProductGrid } from "@/components/ecommerce/product-grid"
import { SearchBox } from "@/components/ecommerce/search-box"
import { FilterSidebar } from "@/components/ecommerce/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"
import { useFilterStore } from "@/lib/stores/filter-store"
import { products, filterProducts } from "@/lib/products-data"
import { useState, useMemo } from "react"

export default function ProductsPage() {
  const filters = useFilterStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters)
  }, [filters])

  const activeFilterCount = [
    filters.selectedCategories.length,
    filters.searchQuery ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0,
    filters.inStockOnly ? 1 : 0,
    filters.onSaleOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

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

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <SearchBox />
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
            <div className="flex items-center gap-4">
              <FilterSidebar />
              
              {activeFilterCount > 0 && (
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                    {filteredProducts.length}
                  </span> products found
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-primary-400">
                      ({activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active)
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <select 
                className="bg-transparent border-0 text-sm focus:ring-0"
                value={filters.sortBy}
                onChange={(e) => filters.setSortBy(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Sort by: Price Low to High</option>
                <option value="price-high">Sort by: Price High to Low</option>
                <option value="rating">Sort by: Best Rating</option>
                <option value="name">Sort by: Name</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} viewMode={viewMode} />

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={filters.clearAllFilters}
                className="rounded-full"
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-16">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}