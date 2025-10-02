import { Header } from "@/components/layout/header"
import { ProductGallery } from "@/components/ecommerce/product-gallery"
import { ProductInfo } from "@/components/ecommerce/product-info"
import { ProductTabs } from "@/components/ecommerce/product-tabs"
import { RelatedProducts } from "@/components/ecommerce/related-products"
import { notFound } from "next/navigation"
import Link from "next/link"

// Mock data - we'll replace this with real data later
const mockProduct = {
  id: "1",
  name: "Radiant Glow Serum",
  price: 42.99,
  originalPrice: 52.99,
  images: [
    "/placeholder-product.jpg",
    "/placeholder-product.jpg", 
    "/placeholder-product.jpg",
    "/placeholder-product.jpg"
  ],
  category: "Skincare",
  rating: 4.5,
  reviewCount: 128,
  isNew: true,
  isBestSeller: true,
  shortDescription: "Vitamin C enriched serum for bright, glowing skin with natural ingredients.",
  description: "Our award-winning Radiant Glow Serum is formulated with 20% Vitamin C, hyaluronic acid, and natural botanicals to deliver visible results. This lightweight, fast-absorbing serum brightens complexion, reduces appearance of dark spots, and provides intense hydration for a youthful, radiant glow.",
  ingredients: "Aqua, Ethyl Ascorbic Acid, Hyaluronic Acid, Niacinamide, Aloe Barbadensis Leaf Juice, Glycerin, Propanediol, Salix Alba (Willow) Bark Extract, Xanthan Gum, Sodium Hydroxide, Phenoxyethanol, Ethylhexylglycerin",
  howToUse: "Apply 2-3 drops to cleansed face and neck every morning before moisturizer. Gently pat into skin until fully absorbed. Follow with sunscreen for optimal protection.",
  benefits: [
    "Brightens complexion and evens skin tone",
    "Reduces appearance of dark spots and hyperpigmentation",
    "Provides intense 72-hour hydration",
    "Improves skin texture and elasticity",
    "Protects against environmental stressors"
  ],
  variants: [
    { id: "1", name: "30ml", price: 42.99, inStock: true },
    { id: "2", name: "50ml", price: 64.99, inStock: true },
    { id: "3", name: "100ml", price: 99.99, inStock: false }
  ],
  inStock: true,
  sku: "GLOW-001",
  tags: ["Vitamin C", "Brightening", "Hydrating", "Vegan", "Cruelty Free"]
}

const relatedProducts = [
  {
    id: "2",
    name: "Hydrating Lip Oil",
    price: 24.99,
    images: ["/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    shortDescription: "Moisturizing lip oil with hyaluronic acid and natural shine."
  },
  {
    id: "4",
    name: "Overnight Repair Cream",
    price: 55.99,
    images: ["/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.7,
    reviewCount: 174,
    shortDescription: "Intensive overnight treatment with retinol and natural botanicals."
  },
  {
    id: "6",
    name: "Gentle Foaming Cleanser",
    price: 22.99,
    originalPrice: 27.99,
    images: ["/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.4,
    reviewCount: 95,
    isNew: true,
    shortDescription: "pH-balanced cleanser that removes impurities without stripping moisture."
  }
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, we'd fetch the product by ID
  if (params.id !== "1") {
    notFound()
  }

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
            <a href={`/products/${mockProduct.category.toLowerCase()}`} className="hover:text-primary-400">
              {mockProduct.category}
            </a>
            <span>›</span>
            <span className="text-gray-900 dark:text-dark-text-primary">{mockProduct.name}</span>
          </nav>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ProductGallery product={mockProduct} />
            <ProductInfo product={mockProduct} />
          </div>

          {/* Product Tabs Section */}
          <ProductTabs product={mockProduct} />

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
    </div>
  )
}