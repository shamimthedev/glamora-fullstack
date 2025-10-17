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

// Helper function to transform Prisma product to our Product type
function transformProduct(product: any): Product {
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
    variants: product.variants || [],
    reviews: product.reviews?.map((review: any) => ({
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
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    })) || [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
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
    cache: 'no-store' // Ensure fresh data
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const products = await response.json()
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

  const product = await response.json()
  return transformProduct(product)
}

export async function getRelatedProducts(productId: string, category: string, limit: number = 3): Promise<Product[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/products?category=${category}&limit=${limit + 1}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch related products')
  }

  const products = await response.json()
  const transformedProducts = products.map(transformProduct)
  // Filter out the current product
  return transformedProducts.filter((product: Product) => product.id !== productId).slice(0, limit)
}