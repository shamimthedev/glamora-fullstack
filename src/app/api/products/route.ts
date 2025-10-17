// src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    const where: {
      category?: string
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' }
        description?: { contains: string; mode: 'insensitive' }
        shortDescription?: { contains: string; mode: 'insensitive' }
      }>
    } = {}

    // Filter by category
    if (category && category !== 'all') {
      where.category = category
    }

    // Search by name or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      take: limit ? parseInt(limit) : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Convert to plain objects to handle Date objects
    const serializedProducts = products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      variants: product.variants.map(variant => ({
        ...variant,
        createdAt: variant.createdAt.toISOString(),
        updatedAt: variant.updatedAt.toISOString(),
      })),
      reviews: product.reviews.map(review => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString(),
        user: review.user ? {
          name: review.user.name,
          image: review.user.image,
        } : null,
      })),
    }))

    return NextResponse.json(serializedProducts)
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}