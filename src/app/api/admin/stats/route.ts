import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email || session.user.email !== 'admin@glamora.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total revenue (sum of all paid orders)
    const revenueData = await prisma.order.aggregate({
      where: {
        paymentStatus: 'paid',
      },
      _sum: {
        total: true,
      },
    })

    // Get total products
    const productCount = await prisma.product.count()

    // Get total customers (users with at least one order)
    const customerCount = await prisma.user.count({
      where: {
        orders: {
          some: {},
        },
      },
    })

    // Get total orders
    const orderCount = await prisma.order.count()

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get top products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId', 'productName'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    })

    const stats = {
      totalRevenue: revenueData._sum.total || 0,
      productCount,
      customerCount,
      orderCount,
      recentOrders: recentOrders.map(order => ({
        id: order.orderNumber,
        customer: order.user?.name || order.shippingFullName,
        amount: `$${order.total.toFixed(2)}`,
        status: order.status,
      })),
      topProducts: topProducts.map(item => ({
        name: item.productName,
        sales: item._sum.quantity || 0,
        revenue: `$${((item._sum.quantity || 0) * 42.99).toFixed(2)}`, // This would need proper calculation
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Admin stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}