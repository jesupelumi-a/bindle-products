<script setup>
const route = useRoute()

const { data: product, pending, error } = await useAsyncData(`product-${route.params.id}`, async () => {
  const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  return response.json()
})

useSeoMeta({
  title: () => product.value ? `${product.value.title} - Bindle Products` : "Loading...",
  description: () => product.value?.description || "",
  ogImage: () => product.value?.thumbnail || "",
});
</script>

<template>
  <div class="container mx-auto px-4 py-8" v-if="product">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 tracking-wide">
        Bindle Products
      </h1>
      <div class="h-1 w-24 bg-blue-500 mx-auto mt-2"></div>
    </div>

    <NuxtLink to="/" class="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clip-rule="evenodd" />
      </svg>
      Back to Products
    </NuxtLink>

    <div v-if="error" class="text-red-500 text-center py-8">
      Error loading product. Please try again later.
    </div>

    <div v-else-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="animate-pulse bg-gray-200 rounded-lg h-96"></div>
      <div class="flex flex-col gap-4">
        <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div class="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div class="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <img :src="product.thumbnail" :alt="product.title"
        class="w-full rounded-lg border-2 border-gray-200 shadow-md object-cover h-96" />
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl font-bold">{{ product.title }}</h2>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-2xl font-semibold">${{ product.price }}</p>

        <!-- Stock Information -->
        <div class="flex items-center gap-2">
          <span class="text-gray-600">Stock:</span>
          <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
            {{ product.stock }}
          </span>
        </div>

        <!-- Dynamic Add to Cart Button -->
        <div class="mt-4">
          <button v-if="product.stock > 0"
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
            </svg>
            Add to Cart
          </button>
          <p v-else class="text-red-500 font-medium">
            Out of Stock
          </p>
        </div>
      </div>
    </div>
  </div>
</template>