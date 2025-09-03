<script setup lang="ts">
import {computed, ref} from 'vue';
import { useCategories } from '@/composables/useCategories';
import { useProducts } from '@/composables/useProducts';
import { useProductStore } from '@/store/productStore';
import ProductListing from '@/components/products/ProductListing.vue';
import type { Product } from '@/interfaces/product.ts';
import BlSelect from '@/components/ui-kit/BlSelect.vue';
import BlPagination from "@/components/ui-kit/BlPagination.vue";

const store = useProductStore();

const categoriesQuery = useCategories();
const categoryOptions = computed(() => {
  const categories = categoriesQuery.data?.value ?? []; // <-- fallback to empty array
  return [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c: { slug: string; name: string }) => ({
      value: c.slug,
      label: c.name,
    })),
  ];
});

const productsQuery = useProducts();

const selectedCategory = computed({
  get: () => store.category,
  set: (value: string) => store.setCategory(value),
});
const selectedSortOrder = computed({
  get: () => store.sortBy ? `${store.sortBy}&${store.order}` : 'Relevance',
  set: (value: string) => store.setSortOrder(value),
});
const sortOrders = [
  {
    value: 'Relevance',
    label: 'Relevance',
  },
  {
    value: 'title&asc',
    label: 'Title A-Z',
  },
  {
    value: 'title&desc',
    label: 'Title Z-A',
  },
  {
    value: 'price&asc',
    label: 'Price Low to High',
  },
  {
    value: 'price&desc',
    label: 'Price High to Low',
  },
  // TODO: Implement sorting by date and popularity
  // {
  //   value: 'Newest First',
  //   label: 'Newest First',
  // },
  {
    value: 'rating&desc',
    label: 'Best Rated',
  },
  // {
  //   value: 'rating&ascs',
  //   label: 'Most Popular',
  // },
];

const handleAddToCart = (product: Product) => {
  alert(`Added ${product.title} to cart!`);
};

const totalProducts = computed(() => productsQuery.data?.value?.total || 0);
</script>

<template>
  <div class="p-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Study Books</h1>
      <p class="text-gray-600">Find the perfect study materials for your academic journey</p>
    </div>
    
    <!-- Filters -->
    <div id="filters-section" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <bl-select
          v-model="selectedCategory"
          label="Product Category"
          :options="categoryOptions"
        />
        
        <bl-select
          v-model="selectedSortOrder"
          label="Sort Order"
          :options="sortOrders"
        />
      </div>
      
      <div class="text-sm text-gray-600">
        <span class="font-medium">{{ totalProducts }}</span> books found
      </div>
    </div>
    
    <!-- Products Grid -->
    <div v-if="productsQuery.isLoading.value" class="text-gray-500">Loading products...</div>
    <div v-else-if="productsQuery.isError.value" class="text-red-500">Failed to load products.</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <product-listing
        v-for="product in productsQuery.data?.value?.products || []"
        :key="product.id"
        :title="product.title"
        :category="product.category"
        :price="product.price"
        :thumbnail="product.thumbnail"
        @add-to-cart="() => handleAddToCart(product)"
      />
    </div>
    <div class="flex justify-center items-center mt-12 space-x-2">
      <bl-pagination
        :total-items="productsQuery.data?.value?.total || 0"
        :items-per-page="store.limit"
        :current-page="store.page"
        @update:page="store.setPage"
      />
    </div>
    
  </div>
</template>
