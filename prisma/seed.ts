// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@glamora.com' },
    update: {},
    create: {
      name: 'Glamora Admin',
      email: 'admin@glamora.com',
      password: adminPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  })

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'customer',
      emailVerified: new Date(),
    },
  })

  // Create products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Radiant Glow Serum',
        description: 'Our award-winning Radiant Glow Serum is formulated with 20% Vitamin C, hyaluronic acid, and natural botanicals to deliver visible results.',
        shortDescription: 'Vitamin C enriched serum for bright, glowing skin with natural ingredients.',
        price: 42.99,
        originalPrice: 52.99,
        images: ['/placeholder-product.jpg', '/placeholder-product.jpg', '/placeholder-product.jpg'],
        category: 'Skincare',
        rating: 4.5,
        reviewCount: 128,
        inStock: true,
        stockQuantity: 50,
        sku: 'GLOW-001',
        tags: ['Vitamin C', 'Brightening', 'Hydrating', 'Vegan', 'Cruelty Free'],
        isNew: true,
        isBestSeller: true,
        ingredients: 'Aqua, Ethyl Ascorbic Acid, Hyaluronic Acid, Niacinamide, Aloe Barbadensis Leaf Juice',
        howToUse: 'Apply 2-3 drops to cleansed face and neck every morning before moisturizer.',
        benefits: ['Brightens complexion', 'Reduces dark spots', 'Provides intense hydration', 'Improves skin texture'],
      },
      {
        name: 'Hydrating Lip Oil',
        description: 'Our Hydrating Lip Oil combines the shine of a gloss with the treatment benefits of a lip oil.',
        shortDescription: 'Moisturizing lip oil with hyaluronic acid and natural shine.',
        price: 24.99,
        images: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
        category: 'Makeup',
        rating: 4.8,
        reviewCount: 89,
        inStock: true,
        stockQuantity: 75,
        sku: 'LIPOIL-002',
        tags: ['Lip Care', 'Hydrating', 'Vegan', 'Gloss', 'Treatment'],
        isNew: true,
        isBestSeller: false,
        ingredients: 'Simmondsia Chinensis (Jojoba) Seed Oil, Olea Europaea (Olive) Fruit Oil, Hyaluronic Acid',
        howToUse: 'Apply directly to lips as needed throughout the day.',
        benefits: ['Provides 8-hour hydration', 'Non-sticky formula', 'Plumps and smooths lip texture'],
      },
      {
        name: 'Satin Finish Foundation',
        description: 'Achieve a flawless, skin-like finish with our Satin Finish Foundation.',
        shortDescription: 'Lightweight foundation with buildable coverage and satin finish.',
        price: 38.99,
        originalPrice: 45.99,
        images: ['/placeholder-product.jpg', '/placeholder-product.jpg', '/placeholder-product.jpg'],
        category: 'Makeup',
        rating: 4.3,
        reviewCount: 256,
        inStock: true,
        stockQuantity: 30,
        sku: 'FOUND-003',
        tags: ['Foundation', 'Buildable', 'Long-wear', 'Satin Finish', '30 Shades'],
        isNew: false,
        isBestSeller: true,
        ingredients: 'Aqua, Dimethicone, Glycerin, Butylene Glycol, PEG-10 Dimethicone',
        howToUse: 'Apply 1-2 pumps to face and blend with brush, sponge, or fingers.',
        benefits: ['Buildable medium to full coverage', 'Natural satin finish', 'Long-wearing up to 12 hours'],
      },
      {
        name: 'Overnight Repair Cream',
        description: 'Wake up to rejuvenated skin with our Overnight Repair Cream.',
        shortDescription: 'Intensive overnight treatment with retinol and natural botanicals.',
        price: 55.99,
        images: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
        category: 'Skincare',
        rating: 4.7,
        reviewCount: 174,
        inStock: true,
        stockQuantity: 25,
        sku: 'NIGHT-004',
        tags: ['Retinol', 'Anti-aging', 'Overnight', 'Repair', 'Sensitive Skin'],
        isNew: false,
        isBestSeller: false,
        ingredients: 'Aqua, Glycerin, Cetearyl Alcohol, Retinol, Niacinamide, Ceramide NP',
        howToUse: 'Apply a pea-sized amount to cleansed face and neck every evening.',
        benefits: ['Reduces appearance of fine lines and wrinkles', 'Improves skin texture and elasticity', 'Boosts overnight hydration'],
      },
    ],
  })

  // Create product variants
  await prisma.productVariant.createMany({
    data: [
      { productId: (await prisma.product.findFirst({ where: { sku: 'GLOW-001' } }))!.id, name: '30ml', price: 42.99, inStock: true, sku: 'GLOW-001-30ML' },
      { productId: (await prisma.product.findFirst({ where: { sku: 'GLOW-001' } }))!.id, name: '50ml', price: 64.99, inStock: true, sku: 'GLOW-001-50ML' },
      { productId: (await prisma.product.findFirst({ where: { sku: 'LIPOIL-002' } }))!.id, name: 'Clear', price: 24.99, inStock: true, sku: 'LIPOIL-002-CLEAR' },
      { productId: (await prisma.product.findFirst({ where: { sku: 'LIPOIL-002' } }))!.id, name: 'Berry', price: 24.99, inStock: true, sku: 'LIPOIL-002-BERRY' },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log('Admin credentials:')
  console.log('  Email: admin@glamora.com')
  console.log('  Password: admin123')
  console.log('')
  console.log('Customer credentials:')
  console.log('  Email: customer@example.com') 
  console.log('  Password: customer123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })