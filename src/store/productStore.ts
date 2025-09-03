import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useProductStore = defineStore('productStore', () => {
  const route = useRoute();
  const router = useRouter();

  const category = ref(route.query.category?.toString() || 'all');
  const sortBy = ref(route.query.sortBy?.toString() || '');
  const order = ref(route.query.order?.toString() || '');
  const page = ref(Number(route.query.page || 1));
  const limit = ref(10);

  function setCategory(newCategory: string) {
    category.value = newCategory;
    setPage(1); // Reset to first page on sort change
    updateRoute();
  }

  function setSortOrder(newSortOrder: string) {
    if (newSortOrder === 'Relevance') {
      sortBy.value = '';
      order.value = '';
    } else {
      sortBy.value = newSortOrder.split('&')[0];
      order.value = newSortOrder.split('&')[1];
    }
    setPage(1); // Reset to first page on sort change
    updateRoute();
  }

  function setPage(newPage: number) {
    page.value = newPage;
    updateRoute();
  }

  function updateRoute() {
    const params: Record<string, string> = {
      ...route.query,
      category: category.value,
      page: page.value.toString(),
      sortBy: sortBy.value,
      order: order.value,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );

    router.replace({
      query: filteredParams
    });
  }

  return { category, page, limit, sortBy, order, setCategory, setSortOrder, setPage };
});
