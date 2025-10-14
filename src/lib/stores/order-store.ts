import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  trackingNumber?: string
  carrier?: string
}

interface OrderStore {
  orders: Order[]
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => string
  getOrder: (orderId: string) => Order | undefined
  getUserOrders: (userId: string) => Order[]
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  cancelOrder: (orderId: string) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      createOrder: (orderData) => {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        
        set({ orders: [newOrder, ...get().orders] })
        return orderId
      },
      
      getOrder: (orderId) => {
        return get().orders.find(order => order.id === orderId)
      },
      
      getUserOrders: (userId) => {
        return get().orders.filter(order => order.userId === userId).sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      },
      
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          )
        })
      },
      
      cancelOrder: (orderId) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId
              ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() }
              : order
          )
        })
      },
    }),
    {
      name: 'order-storage',
    }
  )
)