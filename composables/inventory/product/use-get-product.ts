import type { ErrorResponse } from "~/interfaces/error.response";
import type { GetListProducts } from "~/interfaces/inventory/product/response/get.list.products.";
import type { GetProduct } from "~/interfaces/inventory/product/response/get.product";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetProduct() {
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();
  const result = reactive<{
    product: GetProduct | null;
    loading: boolean;
  }>({
    product: null,
    loading: false,
  });
  async function fetchAllProducts() {
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
  async function fetchProductById(id: string) {
    const url = useGetApiUrl(`product/${id}`);
    try {
      result.loading = true;
      result.product = await $fetch<GetProduct>(url);
    } catch (e: any) {
      const error = e as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      result.loading = false;
    }
    return result;
  }

  return {
    result,
    refreshProduct: fetchProductById,
    fetchAllProducts,
  };
}
