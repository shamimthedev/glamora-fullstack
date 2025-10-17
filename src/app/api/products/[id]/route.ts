// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Context {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, context: Context) {
  try {
    const { id } = await context.params

    const product = await prisma.product.findUnique({
      where: { id },
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
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Convert to plain object to handle Date objects
    const serializedProduct = {
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
    }

    return NextResponse.json(serializedProduct)
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}