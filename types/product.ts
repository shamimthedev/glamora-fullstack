// types/product.ts
export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number | null
  images: string[]
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  sku: string
  tags: string[]
  isNew: boolean
  isBestSeller: boolean
  ingredients?: string | null
  howToUse?: string | null
  benefits: string[]
  variants: ProductVariant[]
  reviews: ProductReview[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  price?: number | null
  inStock: boolean
  sku?: string | null
  createdAt: string
  updatedAt: string
}

export interface ProductReview {
  id: string
  userId: string
  productId: string
  rating: number
  title?: string | null
  comment?: string | null
  verified: boolean
  user?: {
    name?: string | null
    image?: string | null
  }
  createdAt: string
  updatedAt: string
}