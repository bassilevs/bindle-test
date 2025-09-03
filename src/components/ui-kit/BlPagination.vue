<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxPages?: number; // optional, max number of page buttons to show
}>();

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const pages = computed(() => {
  const max = props.maxPages ?? 5;
  const total = totalPages.value;
  
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);
  
  let start = Math.max(props.currentPage - Math.floor(max / 2), 1);
  let end = start + max - 1;
  
  if (end > total) {
    end = total;
    start = end - max + 1;
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

</script>

<template>
  <nav class="flex items-center justify-center space-x-2" aria-label="Pagination">
    <button
      class="px-3 py-3 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      <svg class="svg-inline--fa fa-chevron-left h-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>
    </button>
    
    <button
      v-for="page in pages"
      :key="page"
      :class="[
        page === currentPage ? 'px-4 py-2 bg-teal-600 text-white rounded-lg' : 'px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50'
      ]"
      @click="$emit('update:page', page)"
    >
      {{ page }}
    </button>
    
    <button
      class="px-3 py-3 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      <svg class="svg-inline--fa fa-chevron-right h-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>
    </button>
  </nav>
</template>
