<script setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query'

const ITEMS_PER_PAGE = 20
const currentPage = ref(1)
const queryClient = useQueryClient()

const fetchProducts = async (page) => {
  const skip = (page - 1) * ITEMS_PER_PAGE
  const response = await fetch(`https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`)
  return response.json()
}

const { data, isLoading, error } = useQuery({
  queryKey: ['products', currentPage],
  queryFn: () => fetchProducts(currentPage.value),
  keepPreviousData: true
})


const preloadPage = async (page) => {
  await queryClient.prefetchQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
  })
}

const handleMouseEnter = (page) => {
  if (page !== currentPage.value) {
    preloadPage(page)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 tracking-wide">
        Bindle Products
      </h1>
      <div class="h-1 w-24 bg-blue-500 mx-auto mt-2"></div>
    </div>

    <div v-if="error" class="text-red-500 text-center py-8">
      Error loading products. Please try again later.
    </div>

    <div v-else-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in ITEMS_PER_PAGE" :key="i" class="border rounded-lg p-4 animate-pulse">
        <div class="bg-gray-200 h-48 rounded mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>


    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <NuxtLink v-for="product in data.products" :key="product.id" :to="`/products/${product.id}`"
        class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover rounded mb-4" />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-600">${{ product.price }}</p>
      </NuxtLink>
    </div>

    <div v-if="data" class="flex justify-center mt-8 space-x-2">
      <button v-for="page in Math.ceil((data.total ?? 1) / ITEMS_PER_PAGE)" :key="page"
        @mouseenter="handleMouseEnter(page)" @click="currentPage = page" :class="[
          'px-4 py-2 rounded transition-colors',
          currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        ]">
        {{ page }}
      </button>
    </div>
  </div>
</template>