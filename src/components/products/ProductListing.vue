<script setup lang="ts">

import BlButton from "../ui-kit/BlButton.vue";

interface Props {
  title: string
  category: string
  price: number
  thumbnail: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300 group flex flex-col justify-between">
    <div class="relative">
      <div class="w-full h-48 bg-white flex items-center justify-center">
        <img class="w-20 h-28 object-cover rounded shadow-sm" :src="props.thumbnail" alt="calculus textbook cover, academic book spine, white background">
      </div>
    </div>
    <div class="p-4 flex flex-col">
      <h3 class="text-base font-semibold text-gray-900 mb-2">{{ props.title }}</h3>
<!--      <p class="text-sm text-gray-600 mb-4">by {{ props.author }}</p>-->
      <div class="text-xl font-bold text-teal-600 mb-4">${{ props.price.toFixed(2) }}</div>
      <bl-button @click="$emit('add-to-cart')" class="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium">
        Add to Cart
      </bl-button>
    </div>
  </div>
</template>
