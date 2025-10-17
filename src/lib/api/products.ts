// lib/api/products.ts

import { Product, ProductReview, ProductVariant } from "../../../types/product"

export interface ApiProduct extends Product {
  variants: ProductVariant[]
  reviews: ProductReview[]
}

// Helper function to get the base URL
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Browser environment
    return ''
  }
  if (process.env.VERCEL_URL) {
    // Vercel environment
    return `https://${process.env.VERCEL_URL}`
  }
  // Development environment
  return `http://localhost:${process.env.PORT || 3000}`
}

// Interface for Prisma product response
interface PrismaProduct {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice: number | null
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
  ingredients: string | null
  howToUse: string | null
  benefits: string[]
  variants: PrismaVariant[]
  reviews: PrismaReview[]
  createdAt: string | Date
  updatedAt: string | Date
}

interface PrismaVariant {
  id: string
  productId: string
  name: string
  price: number | null
  inStock: boolean
  sku: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

interface PrismaReview {
  id: string
  userId: string
  productId: string
  rating: number
  title: string | null
  comment: string | null
  verified: boolean
  user: {
    name: string | null
    image: string | null
  } | null
  createdAt: string | Date
  updatedAt: string | Date
}

// Helper function to transform Prisma product to our Product type
function transformProduct(product: PrismaProduct): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription,
    price: product.price,
    originalPrice: product.originalPrice,
    images: product.images,
    category: product.category,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: product.inStock,
    stockQuantity: product.stockQuantity,
    sku: product.sku,
    tags: product.tags,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    ingredients: product.ingredients,
    howToUse: product.howToUse,
    benefits: product.benefits,
    variants: product.variants.map(variant => ({
      id: variant.id,
      productId: variant.productId,
      name: variant.name,
      price: variant.price,
      inStock: variant.inStock,
      sku: variant.sku,
      createdAt: typeof variant.createdAt === 'string' ? variant.createdAt : variant.createdAt.toISOString(),
      updatedAt: typeof variant.updatedAt === 'string' ? variant.updatedAt : variant.updatedAt.toISOString(),
    })),
    reviews: product.reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      productId: review.productId,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      verified: review.verified,
      user: review.user ? {
        name: review.user.name,
        image: review.user.image,
      } : undefined,
      createdAt: typeof review.createdAt === 'string' ? review.createdAt : review.createdAt.toISOString(),
      updatedAt: typeof review.updatedAt === 'string' ? review.updatedAt : review.updatedAt.toISOString(),
    })),
    createdAt: typeof product.createdAt === 'string' ? product.createdAt : product.createdAt.toISOString(),
    updatedAt: typeof product.updatedAt === 'string' ? product.updatedAt : product.updatedAt.toISOString(),
  }
}

export async function getProducts(filters?: {
  category?: string
  search?: string
  limit?: number
}): Promise<Product[]> {
  const params = new URLSearchParams()
  
  if (filters?.category) params.append('category', filters.category)
  if (filters?.search) params.append('search', filters.search)
  if (filters?.limit) params.append('limit', filters.limit.toString())

  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/products?${params}`
  
  const response = await fetch(url, {
    // Remove cache: 'no-store' to allow static generation
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const products: PrismaProduct[] = await response.json()
  return products.map(transformProduct)
}

export async function getProductById(id: string): Promise<Product> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/products/${id}`)
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found')
    }
    throw new Error('Failed to fetch product')
  }

  const product: PrismaProduct = await response.json()
  return transformProduct(product)
}

export async function getRelatedProducts(productId: string, category: string, limit: number = 3): Promise<Product[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/products?category=${category}&limit=${limit + 1}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch related products')
  }

  const products: PrismaProduct[] = await response.json()
  const transformedProducts = products.map(transformProduct)
  // Filter out the current product
  return transformedProducts.filter((product: Product) => product.id !== productId).slice(0, limit)
}