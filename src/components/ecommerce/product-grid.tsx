import { ProductCard } from "./product-card"
import { products } from "@/lib/products-data"

interface ProductGridProps {
  limit?: number
}

export function ProductGrid({ limit }: ProductGridProps) {
  const displayProducts = limit ? products.slice(0, limit) : products

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}