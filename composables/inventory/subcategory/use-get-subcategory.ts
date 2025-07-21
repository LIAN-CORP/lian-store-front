import type { GetListSubcategories } from "~/interfaces/inventory/response/get.list.subcategories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default async function useGetSubcategory(
  id: string
): Promise<paginatedResponse<GetListSubcategories>> {
  const url = useGetApiUrl(`subcategory/parent/${id}`);
  try {
    const data = await $fetch<paginatedResponse<GetListSubcategories>>(url);
    return {
      ...data,
      content: data.content ?? [],
    };
  } catch {
    return {
      content: [],
      first: true,
      last: true,
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
      totalPage: 1,
    };
  }
}
