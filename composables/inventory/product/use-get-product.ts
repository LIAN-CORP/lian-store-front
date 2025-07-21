import type { GetListProducts } from "~/interfaces/inventory/response/get.list.products.";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default async function useGetProduct() {
  const url = useGetApiUrl("product");
  return await useFetch<paginatedResponse<GetListProducts>>(url, {
    query: {
      page: 0,
      size: 10,
      isAsc: true,
      sortBy: "name",
    },
  });
}
