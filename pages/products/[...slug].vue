<script setup>
const route = useRoute()
const { data: productIds } = await useFetch('/api/products')

defineNuxtRoutes(() => {
  if (!productIds.value) return []

  return productIds.value.map((id) => ({
    name: `products-${id}`,
    path: `/products/${id}`,
    file: '~/pages/products/[id].vue'
  }))
})
</script>

<template>
  <NuxtPage />
</template>