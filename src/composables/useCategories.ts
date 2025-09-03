import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('products/categories');
      return res.data as string[];
    },
  });
}
