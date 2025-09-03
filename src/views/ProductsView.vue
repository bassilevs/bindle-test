<script setup lang="ts">
import ProductListing from "../components/products/ProductListing.vue";
import type {Product} from "../interfaces/product.ts";
import BlSelect from "../components/ui-kit/BlSelect.vue";
import {ref} from "vue";

const handleAddToCart = (product: { title: string }) => {
  alert(`Added ${product.title} to cart!`);
};

const products: Product[] = [{
  id: 195,
  title: "BMW Pencil",
  author: "BMW",
  category: "BMW",
  price: 5.99,
  image: "https://example.com/bmw-pencil.jpg",
}];

const selectedCategory = ref('All Categories');
const categories = [
  'All Categories',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Engineering',
  'Medicine',
  'Business',
  'Textbooks',
  'Workbooks',
  'Reference Guides',
  'Practice Tests',
  'Study Guides',
  'Lab Manuals',
];
const selectedSortOrder = ref('Relevance');
const sortOrders = [
  'Relevance',
  'Title A-Z',
  'Title Z-A',
  'Price Low to High',
  'Price High to Low',
  'Newest First',
  'Best Rated',
  'Most Popular',
];

</script>

<template>
  <div class="p-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Study Books</h1>
      <p class="text-gray-600">Find the perfect study materials for your academic journey</p>
    </div>
    
    <div id="filters-section" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <bl-select
          v-model="selectedCategory"
          label="Product Category"
          :options="categories"
        />
        <bl-select
          v-model="selectedSortOrder"
          label="Sort Order"
          :options="sortOrders"
        />
      </div>
      
      <div class="text-sm text-gray-600">
        <span class="font-medium">1,247</span> books found
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <ProductListing
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        :author="product.author"
        :category="product.category"
        :price="product.price"
        :image="product.image"
        @add-to-cart="handleAddToCart(product)"
      />
    </div>
  
  </div>
</template>

<style scoped>

</style>