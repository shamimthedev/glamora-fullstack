import { ProductCard } from "./product-card"
import { Product } from "@/lib/products-data"

interface RelatedProductsProps {
  products?: Product[] // Make it optional
}

export function RelatedProducts({ products = [] }: RelatedProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="border-t border-gray-200 dark:border-dark-border pt-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        You Might Also <span className="text-primary-400">Like</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}