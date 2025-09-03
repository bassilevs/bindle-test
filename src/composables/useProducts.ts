import {useQuery} from '@tanstack/vue-query';
import api from '@/plugins/axios';
import {useProductStore} from '@/store/productStore';
import {computed} from "vue";

export function useProducts() {
  const store = useProductStore();
  const queryKey = computed(() => ['products', store.category, store.page, store.sortBy, store.order]);
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const skip = (store.page - 1) * store.limit;
      console.log('Fetching products with sort:', store.sortBy, store.order);
      const queryString = store.sortBy ? `&sortBy=${store.sortBy}&order=${store.order}` : '';

      const url =
        store.category === 'all'
          ? `products?limit=${store.limit}&skip=${skip}` + queryString
          : `products/category/${store.category}?limit=${store.limit}&skip=${skip}` + queryString;

      const res = await api.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });
}
