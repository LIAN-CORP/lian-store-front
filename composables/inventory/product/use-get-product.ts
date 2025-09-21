import type { ErrorResponse } from "~/interfaces/error.response";
import type { GetListProducts } from "~/interfaces/inventory/product/response/get.list.products.";
import type { GetProduct } from "~/interfaces/inventory/product/response/get.product";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetProduct() {
  const token = useCookie("access_token");
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();
  const result = reactive<{
    products: paginatedResponse<GetListProducts> | null;
    product: GetProduct | null;
    loading: boolean;
  }>({
    products: null,
    product: null,
    loading: false,
  });

  async function fetchAllProducts(page: number, size: number) {
    const url = useGetApiUrl("product");
    try {
      result.loading = true;
      result.products = await $fetch<paginatedResponse<GetListProducts>>(url, {
        query: {
          page: page,
          size: size,
          isAsc: true,
          sortBy: "name",
        },
        headers: {
          Authorization: token.value ? `Bearer ${token.value}` : "",
        },
      });
    } catch (e: any) {
      result.product = null;
    } finally {
      result.loading = false;
    }
    return result;
  }
  async function fetchProductById(id: string) {
    const url = useGetApiUrl(`product/${id}`);
    try {
      result.loading = true;
      result.product = await $fetch<GetProduct>(url, {
        headers: {
          Authorization: token.value ? `Bearer ${token.value}` : "",
        },
      });
    } catch (e: any) {
      const error = e as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      result.loading = false;
    }
    return result;
  }

  async function fetchAllProductsByName(
    page: number,
    size: number,
    name: string
  ) {
    const url = useGetApiUrl("product/name");
    try {
      result.loading = true;
      result.products = await $fetch<paginatedResponse<GetListProducts>>(url, {
        query: {
          page: page,
          size: size,
          isAsc: true,
          sortBy: "name",
          name: name,
        },
        headers: {
          Authorization: token.value ? `Bearer ${token.value}` : "",
        },
      });
    } catch (e: any) {
      result.products = null;
    } finally {
      result.loading = false;
    }
    return result;
  }
  return {
    result,
    fetchAllProducts,
    refreshProduct: fetchProductById,
    fetchAllProductsByName,
  };
}
