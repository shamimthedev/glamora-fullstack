export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestSeller?: boolean
  shortDescription: string
  description: string
  ingredients: string
  howToUse: string
  benefits: string[]
  variants: { id: string; name: string; price: number; inStock: boolean }[]
  inStock: boolean
  sku: string
  tags: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Radiant Glow Serum",
    price: 42.99,
    originalPrice: 52.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isBestSeller: true,
    shortDescription: "Vitamin C enriched serum for bright, glowing skin with natural ingredients.",
    description: "Our award-winning Radiant Glow Serum is formulated with 20% Vitamin C, hyaluronic acid, and natural botanicals to deliver visible results. This lightweight, fast-absorbing serum brightens complexion, reduces appearance of dark spots, and provides intense hydration for a youthful, radiant glow.",
    ingredients: "Aqua, Ethyl Ascorbic Acid, Hyaluronic Acid, Niacinamide, Aloe Barbadensis Leaf Juice, Glycerin, Propanediol, Salix Alba (Willow) Bark Extract, Xanthan Gum, Sodium Hydroxide, Phenoxyethanol, Ethylhexylglycerin",
    howToUse: "Apply 2-3 drops to cleansed face and neck every morning before moisturizer. Gently pat into skin until fully absorbed. Follow with sunscreen for optimal protection.",
    benefits: [
      "Brightens complexion and evens skin tone",
      "Reduces appearance of dark spots and hyperpigmentation",
      "Provides intense 72-hour hydration",
      "Improves skin texture and elasticity",
      "Protects against environmental stressors"
    ],
    variants: [
      { id: "1", name: "30ml", price: 42.99, inStock: true },
      { id: "2", name: "50ml", price: 64.99, inStock: true },
      { id: "3", name: "100ml", price: 99.99, inStock: false }
    ],
    inStock: true,
    sku: "GLOW-001",
    tags: ["Vitamin C", "Brightening", "Hydrating", "Vegan", "Cruelty Free"]
  },
  {
    id: "2",
    name: "Hydrating Lip Oil",
    price: 24.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    isBestSeller: false,
    shortDescription: "Moisturizing lip oil with hyaluronic acid and natural shine.",
    description: "Our Hydrating Lip Oil combines the shine of a gloss with the treatment benefits of a lip oil. Infused with hyaluronic acid, vitamin E, and natural oils, it plumps, hydrates, and gives your lips a beautiful, non-sticky shine.",
    ingredients: "Simmondsia Chinensis (Jojoba) Seed Oil, Olea Europaea (Olive) Fruit Oil, Hyaluronic Acid, Tocopherol, Rosmarinus Officinalis (Rosemary) Leaf Extract, Citrus Aurantium Dulcis (Orange) Peel Oil",
    howToUse: "Apply directly to lips as needed throughout the day. Can be worn alone or over lipstick for added shine.",
    benefits: [
      "Provides 8-hour hydration",
      "Non-sticky formula",
      "Plumps and smooths lip texture",
      "Available in 6 sheer shades",
      "Vegan and cruelty-free"
    ],
    variants: [
      { id: "1", name: "Clear", price: 24.99, inStock: true },
      { id: "2", name: "Berry", price: 24.99, inStock: true },
      { id: "3", name: "Peach", price: 24.99, inStock: true }
    ],
    inStock: true,
    sku: "LIPOIL-002",
    tags: ["Lip Care", "Hydrating", "Vegan", "Gloss", "Treatment"]
  },
  {
    id: "3",
    name: "Satin Finish Foundation",
    price: 38.99,
    originalPrice: 45.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.3,
    reviewCount: 256,
    isNew: false,
    isBestSeller: true,
    shortDescription: "Lightweight foundation with buildable coverage and satin finish.",
    description: "Achieve a flawless, skin-like finish with our Satin Finish Foundation. This weightless formula provides buildable coverage from medium to full, blurring imperfections while allowing your natural skin to shine through. Perfect for all skin types.",
    ingredients: "Aqua, Dimethicone, Glycerin, Butylene Glycol, PEG-10 Dimethicone, Disteardimonium Hectorite, Phenoxyethanol, Sodium Chloride, Disodium EDTA",
    howToUse: "Apply 1-2 pumps to face and blend with brush, sponge, or fingers. Build coverage as needed.",
    benefits: [
      "Buildable medium to full coverage",
      "Natural satin finish",
      "Long-wearing up to 12 hours",
      "Non-comedogenic formula",
      "Available in 30 shades"
    ],
    variants: [
      { id: "1", name: "30ml", price: 38.99, inStock: true }
    ],
    inStock: true,
    sku: "FOUND-003",
    tags: ["Foundation", "Buildable", "Long-wear", "Satin Finish", "30 Shades"]
  },
  {
    id: "4",
    name: "Overnight Repair Cream",
    price: 55.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.7,
    reviewCount: 174,
    isNew: false,
    isBestSeller: false,
    shortDescription: "Intensive overnight treatment with retinol and natural botanicals.",
    description: "Wake up to rejuvenated skin with our Overnight Repair Cream. This potent night treatment combines encapsulated retinol with soothing botanicals to repair damage, reduce fine lines, and boost hydration while you sleep.",
    ingredients: "Aqua, Glycerin, Cetearyl Alcohol, Retinol, Niacinamide, Ceramide NP, Centella Asiatica Extract, Chamomilla Recutita (Matricaria) Flower Extract, Xanthan Gum, Phenoxyethanol",
    howToUse: "Apply a pea-sized amount to cleansed face and neck every evening. Avoid eye area. Always follow with sunscreen in the morning.",
    benefits: [
      "Reduces appearance of fine lines and wrinkles",
      "Improves skin texture and elasticity",
      "Boosts overnight hydration",
      "Strengthens skin barrier",
      "Non-irritating retinol formula"
    ],
    variants: [
      { id: "1", name: "50ml", price: 55.99, inStock: true },
      { id: "2", name: "100ml", price: 89.99, inStock: true }
    ],
    inStock: true,
    sku: "NIGHT-004",
    tags: ["Retinol", "Anti-aging", "Overnight", "Repair", "Sensitive Skin"]
  },
  {
    id: "5",
    name: "Volumizing Mascara",
    price: 28.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "Makeup",
    rating: 4.6,
    reviewCount: 203,
    isNew: false,
    isBestSeller: true,
    shortDescription: "Clump-free mascara for dramatic volume and length.",
    description: "Get bigger, fuller lashes with our Volumizing Mascara. The unique brush separates and coats each lash from root to tip, delivering dramatic volume without clumps or flakes. Water-resistant and smudge-proof.",
    ingredients: "Aqua, Beeswax, Carnauba Wax, Acacia Senegal Gum, Iron Oxides, Phenoxyethanol, Potassium Sorbate",
    howToUse: "Starting at the base of lashes, wiggle brush upward to tip. Apply 2-3 coats for maximum volume.",
    benefits: [
      "Clump-free formula",
      "Water-resistant",
      "Buildable volume",
      "Lash care complex",
      "Ophthalmologist tested"
    ],
    variants: [
      { id: "1", name: "Black", price: 28.99, inStock: true },
      { id: "2", name: "Brown Black", price: 28.99, inStock: true }
    ],
    inStock: true,
    sku: "MASC-005",
    tags: ["Mascara", "Volumizing", "Water-resistant", "Lash Care", "Dramatic"]
  },
  {
    id: "6",
    name: "Gentle Foaming Cleanser",
    price: 22.99,
    originalPrice: 27.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "Skincare",
    rating: 4.4,
    reviewCount: 95,
    isNew: true,
    isBestSeller: false,
    shortDescription: "pH-balanced cleanser that removes impurities without stripping moisture.",
    description: "Our Gentle Foaming Cleanser effectively removes makeup, dirt, and impurities while maintaining your skin's natural moisture barrier. The pH-balanced formula creates a rich, gentle foam that leaves skin clean, soft, and refreshed.",
    ingredients: "Aqua, Cocamidopropyl Betaine, Glycerin, Decyl Glucoside, Chamomilla Recutita (Matricaria) Flower Extract, Aloe Barbadensis Leaf Juice, Citric Acid, Sodium Benzoate",
    howToUse: "Dispense 1-2 pumps into wet hands, lather, and massage onto damp face. Rinse thoroughly.",
    benefits: [
      "pH-balanced formula",
      "Removes makeup and impurities",
      "Maintains skin's moisture barrier",
      "Suitable for all skin types",
      "Dermatologist tested"
    ],
    variants: [
      { id: "1", name: "150ml", price: 22.99, inStock: true },
      { id: "2", name: "300ml", price: 34.99, inStock: true }
    ],
    inStock: true,
    sku: "CLEAN-006",
    tags: ["Cleanser", "Gentle", "pH-balanced", "Foaming", "All Skin Types"]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getRelatedProducts(currentProductId: string, limit: number = 3): Product[] {
  const currentProduct = getProductById(currentProductId)
  if (!currentProduct) return []
  
  return products
    .filter(product => product.id !== currentProductId && product.category === currentProduct.category)
    .slice(0, limit)
}

export function filterProducts(products: Product[], filters: {
  searchQuery: string
  selectedCategories: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  onSaleOnly: boolean
  sortBy: string
}): Product[] {
  let filtered = products.filter(product => {
    // Search query filter
    const matchesSearch = !filters.searchQuery || 
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = filters.selectedCategories.length === 0 || 
      filters.selectedCategories.includes(product.category)

    // Price range filter
    const productPrice = product.originalPrice || product.price
    const matchesPrice = productPrice >= filters.priceRange[0] && 
                        productPrice <= filters.priceRange[1]

    // Stock filter
    const matchesStock = !filters.inStockOnly || product.inStock

    // Sale filter
    const matchesSale = !filters.onSaleOnly || product.originalPrice !== undefined

    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesSale
  })

  // Sort products
  filtered = sortProducts(filtered, filters.sortBy)

  return filtered
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products]
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => (a.originalPrice || a.price) - (b.originalPrice || b.price))
    case 'price-high':
      return sorted.sort((a, b) => (b.originalPrice || b.price) - (a.originalPrice || a.price))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return 0
      })
    case 'featured':
    default:
      return sorted.sort((a, b) => {
        if (a.isBestSeller && !b.isBestSeller) return -1
        if (!a.isBestSeller && b.isBestSeller) return 1
        return b.rating - a.rating
      })
  }
}