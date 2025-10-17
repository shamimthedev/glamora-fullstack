"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductReviews } from "./product-reviews"
import { Product } from "../../../types/product"

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="mb-16">
      <TabsList className="grid w-full grid-cols-5 rounded-2xl p-1 bg-gray-50 dark:bg-dark-card">
        <TabsTrigger 
          value="description" 
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border"
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="ingredients" 
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border"
        >
          Ingredients
        </TabsTrigger>
        <TabsTrigger 
          value="how-to-use" 
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border"
        >
          How to Use
        </TabsTrigger>
        <TabsTrigger 
          value="benefits" 
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border"
        >
          Benefits
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border"
        >
          Reviews ({product.reviewCount})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-8">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
            {product.description}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="ingredients" className="mt-8">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
            {product.ingredients}
          </p>
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              Clean Formula
            </h4>
            <p className="text-green-700 dark:text-green-400 text-sm">
              This product is free from parabens, sulfates, phthalates, and synthetic fragrances. 
              Made with 95% naturally derived ingredients.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="how-to-use" className="mt-8">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
            {product.howToUse}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                💡 Pro Tip
              </h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                For best results, store in a cool, dry place away from direct sunlight.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                ⏰ Best Time to Use
              </h4>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                Apply every morning as part of your daily skincare routine.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="benefits" className="mt-8">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ul className="text-gray-600 dark:text-dark-text-secondary space-y-2">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-8">
        <ProductReviews 
          productId={product.id}
          averageRating={product.rating}
          reviewCount={product.reviewCount}
        />
      </TabsContent>
    </Tabs>
  )
}