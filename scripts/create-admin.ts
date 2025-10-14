// scripts/create-admin.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function createAdminUser() {
  try {
    const adminEmail = 'admin@glamora.com'
    const adminPassword = 'admin123'
    
    console.log('Creating admin user...')
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingAdmin) {
      console.log('✅ Admin user already exists')
      console.log('Email:', adminEmail)
      console.log('You can now sign in with these credentials')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const adminUser = await prisma.user.create({
      data: {
        name: 'Glamora Admin',
        email: adminEmail,
        password: hashedPassword,
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email:', adminEmail)
    console.log('Password: admin123')
    console.log('')
    console.log('You can now sign in at: http://localhost:3000/auth/signin')
    console.log('Please change the password after first login!')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the function
createAdminUser()