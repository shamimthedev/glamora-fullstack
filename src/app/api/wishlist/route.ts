import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
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
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(wishlistItems)
  } catch (error) {
    console.error('Wishlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId } = await request.json()

    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id!,
          productId,
        },
      },
    })

    if (existingItem) {
      return NextResponse.json({ message: 'Product already in wishlist' })
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: session.user.id!,
        productId,
      },
      include: {
        product: {
          include: {
            variants: true,
            reviews: true,
          },
        },
      },
    })

    return NextResponse.json(wishlistItem)
  } catch (error) {
    console.error('Add to wishlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: session.user.id!,
          productId,
        },
      },
    })

    return NextResponse.json({ message: 'Removed from wishlist' })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}