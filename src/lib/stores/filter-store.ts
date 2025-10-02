import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  selectedCategories: string[]
  priceRange: [number, number]
  sortBy: string
  inStockOnly: boolean
  onSaleOnly: boolean
  
  // Actions
  setSearchQuery: (query: string) => void
  setSelectedCategories: (categories: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setSortBy: (sort: string) => void
  setInStockOnly: (value: boolean) => void
  setOnSaleOnly: (value: boolean) => void
  clearAllFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  // Initial state
  searchQuery: '',
  selectedCategories: [],
  priceRange: [0, 100],
  sortBy: 'featured',
  inStockOnly: false,
  onSaleOnly: false,
  
  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setInStockOnly: (value) => set({ inStockOnly: value }),
  setOnSaleOnly: (value) => set({ onSaleOnly: value }),
  clearAllFilters: () => set({
    searchQuery: '',
    selectedCategories: [],
    priceRange: [0, 100],
    sortBy: 'featured',
    inStockOnly: false,
    onSaleOnly: false,
  }),
}))