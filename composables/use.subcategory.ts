import type { GetListSubcategories } from "~/interfaces/inventory/response/get.list.subcategories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export const useSubcategory = async (id: string) => {
  const url = useRuntimeConfig().public.apiBase;
  const subcategories = await $fetch<paginatedResponse<GetListSubcategories>>(
    `${url}/subcategory/parent/${id}`
  );
  return subcategories;
};
