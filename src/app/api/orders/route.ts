import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders API error:', error)
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

    const body = await request.json()
    const { items, total, subtotal, shipping, tax, shippingAddress, paymentMethod } = body

    // Generate order number
    const orderCount = await prisma.order.count()
    const orderNumber = `ORD-${(orderCount + 1).toString().padStart(4, '0')}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total,
        shippingFullName: shippingAddress.fullName,
        shippingAddress: shippingAddress.address,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingZipCode: shippingAddress.zipCode,
        shippingCountry: shippingAddress.country,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            productName: item.name,
            productImage: item.image,
            productPrice: item.price,
            quantity: item.quantity,
          }))
        }
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}