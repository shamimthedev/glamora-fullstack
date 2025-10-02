import { ProductCard } from "./product-card"

// Mock data - we'll replace this with real data later
const mockProducts = [
  {
    id: "1",
    name: "Radiant Glow Serum",
    price: 42.99,
    originalPrice: 52.99,
    images: ["/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isBestSeller: true,
    shortDescription: "Vitamin C enriched serum for bright, glowing skin with natural ingredients."
  },
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
    id: "3",
    name: "Satin Finish Foundation",
    price: 38.99,
    originalPrice: 45.99,
    images: ["/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.3,
    reviewCount: 256,
    isBestSeller: true,
    shortDescription: "Lightweight foundation with buildable coverage and satin finish."
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
    id: "5",
    name: "Volumizing Mascara",
    price: 28.99,
    images: ["/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.6,
    reviewCount: 203,
    shortDescription: "Clump-free mascara for dramatic volume and length."
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
  },
  {
    id: "7",
    name: "Matte Liquid Lipstick",
    price: 26.99,
    images: ["/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.5,
    reviewCount: 167,
    shortDescription: "Long-wearing matte lipstick in vibrant, transfer-proof colors."
  },
  {
    id: "8",
    name: "Hydrating Face Mist",
    price: 18.99,
    images: ["/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.2,
    reviewCount: 78,
    isNew: true,
    shortDescription: "Refreshing facial mist with rosewater and hyaluronic acid."
  }
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}