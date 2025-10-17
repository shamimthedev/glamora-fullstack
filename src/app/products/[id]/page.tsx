// src/app/products/[id]/page.tsx
import { Header } from "@/components/layout/header"
import { ProductGallery } from "@/components/ecommerce/product-gallery"
import { ProductInfo } from "@/components/ecommerce/product-info"
import { ProductTabs } from "@/components/ecommerce/product-tabs"
import { RelatedProducts } from "@/components/ecommerce/related-products"
import { getProductById, getRelatedProducts } from "@/lib/api/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product
  let relatedProducts = []

  try {
    product = await getProductById(params.id)
    relatedProducts = await getRelatedProducts(product.id, product.category, 3)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-secondary mb-8">
            <a href="/" className="hover:text-primary-400">Home</a>
            <span>›</span>
            <a href="/products" className="hover:text-primary-400">Products</a>
            <span>›</span>
            <a href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-primary-400">
              {product.category}
            </a>
            <span>›</span>
            <span className="text-gray-900 dark:text-dark-text-primary">{product.name}</span>
          </nav>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>

          {/* Product Tabs Section */}
          <ProductTabs product={product} />

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
    </div>
  )
}