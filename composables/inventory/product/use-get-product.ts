import type { GetListProducts } from "~/interfaces/inventory/product/response/get.list.products.";
import type { GetProduct } from "~/interfaces/inventory/product/response/get.product";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetProduct() {
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();

  const products = ref<paginatedResponse<GetListProducts> | null>(null);
  const product = ref<GetProduct | null>(null);
  const loading = ref(false);

  async function fetchAllProducts(page: number, size: number) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<GetListProducts>>("product", {
      query: {
        page: page,
        size: size,
        isAsc: true,
        sortBy: "name",
      },
    });
    await execute();
    products.value = data.value ?? null;
    loading.value = load.value;
  }
  async function fetchProductById(id: string) {
    const {
      data,
      execute,
      loading: load,
      error,
    } = useApiFetch<GetProduct>(`product/${id}`);
    await execute();
    product.value = data.value ?? null;
    loading.value = load.value;
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
    }
  }

  async function fetchAllProductsByName(
    page: number,
    size: number,
    name: string
  ) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<GetListProducts>>("product/name", {
      query: { page, size, isAsc: true, sortBy: "name", name },
    });

    await execute();
    products.value = data.value ?? null;
    loading.value = load.value;
  }
  return {
    products,
    product,
    loading,
    fetchAllProducts,
    refreshProduct: fetchProductById,
    fetchAllProductsByName,
  };
}
