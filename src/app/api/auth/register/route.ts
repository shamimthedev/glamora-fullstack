// src/app/api/auth/register/route.ts - Alternative version
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface UserResponse {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    })

    // Create response without password explicitly
    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userResponse
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Registration error:', error)
    
    // Type-safe error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { message: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}