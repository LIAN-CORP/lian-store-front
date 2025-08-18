import type {ErrorResponse} from "~/interfaces/error.response";
import type {GetListProducts} from "~/interfaces/inventory/product/response/get.list.products.";
import type {GetProduct} from "~/interfaces/inventory/product/response/get.product";
import type {paginatedResponse} from "~/interfaces/paginatedResponse.interface";

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

  async function fetchAllProducts(page: number, size: number) {
    const url = useGetApiUrl("product", "stockApi");
    return useFetch<paginatedResponse<GetListProducts>>(url, {
        query: {
            page: page,
            size: size,
            isAsc: true,
            sortBy: "name",
        },
    });
  }
  async function fetchProductById(id: string) {
    const url = useGetApiUrl(`product/${id}`, "stockApi");
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
    fetchAllProductsByName
  };

  async function fetchAllProductsByName(page: number, size: number, name: string) {
    const url = useGetApiUrl("product/name", "stockApi");
    return await $fetch<paginatedResponse<GetListProducts>>(url, {
      query: {
        page: page,
        size: size,
        isAsc: true,
        sortBy: "name",
        name: name
      }
    });
  }
}
