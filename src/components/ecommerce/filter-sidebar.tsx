"use client"

import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useFilterStore } from "@/lib/stores/filter-store"
import { products } from "@/lib/products-data"

export function FilterSidebar() {
  const {
    selectedCategories,
    priceRange,
    inStockOnly,
    onSaleOnly,
    setSelectedCategories,
    setPriceRange,
    setInStockOnly,
    setOnSaleOnly,
    clearAllFilters,
  } = useFilterStore()

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)))
  
  // Get price range from products
  const minPrice = Math.floor(Math.min(...products.map(p => p.price)))
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.originalPrice || p.price)))

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(newCategories)
  }

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice || inStockOnly || onSaleOnly

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 rounded-full">
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-primary-400"></span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary-400 hover:text-primary-500">
                Clear all
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="space-y-6 py-4">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="rounded border-gray-300 text-primary-400 focus:ring-primary-400"
                  />
                  <span className="text-sm">{category}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({products.filter(p => p.category === category).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-gray-300 text-primary-400 focus:ring-primary-400"
                />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Special Offers */}
          <div>
            <h3 className="font-semibold mb-3">Special Offers</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded border-gray-300 text-primary-400 focus:ring-primary-400"
                />
                <span className="text-sm">On Sale</span>
              </label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}