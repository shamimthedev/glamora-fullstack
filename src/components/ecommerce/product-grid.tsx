import { Button } from "../ui/button"
import { ProductCard } from "./product-card"
import { Product } from "@/lib/products-data"

interface ProductGridProps {
  products?: Product[]  // Make it optional with default
  viewMode?: 'grid' | 'list'
}

export function ProductGrid({ products = [], viewMode = 'grid' }: ProductGridProps) {
  // Early return if no products
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-dark-text-secondary">No products found.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="flex gap-6 p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
            {/* Product image */}
            <div className="flex-shrink-0 w-32 h-32 relative rounded-lg overflow-hidden bg-gray-50">
              <img
                src={product.images[0] || "/placeholder-product.jpg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Product info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-3 line-clamp-2">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary-400">
                  ${product.price}
                </span>
                <Button size="sm" className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}