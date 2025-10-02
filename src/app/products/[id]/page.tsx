import { Header } from "@/components/layout/header"
import { ProductGallery } from "@/components/ecommerce/product-gallery"
import { ProductInfo } from "@/components/ecommerce/product-info"
import { ProductTabs } from "@/components/ecommerce/product-tabs"
import { RelatedProducts } from "@/components/ecommerce/related-products"
import { getProductById, getRelatedProducts } from "@/lib/products-data"
import { notFound } from "next/navigation"
import Link from "next/link"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(params.id)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-secondary mb-8">
            <Link href="/" className="hover:text-primary-400">Home</Link>
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