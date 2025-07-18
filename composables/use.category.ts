import type { GetListCategories } from "~/interfaces/inventory/response/get.list.categories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export const useCategory = () => {
  const url = useRuntimeConfig().public.apiBase;
  const fetchCategories = useFetch<paginatedResponse<GetListCategories>>(
    `${url}/category`,
    {
      query: {
        page: 0,
        size: 10,
        isAsc: true,
      },
      lazy: true,
    }
  );
  return {
    fetchCategories,
  };
};
