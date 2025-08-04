import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";

export default function useNewSubcategory() {
  async function createNewProduct(image: File, product: NewProductRequest) {
    const url = useGetApiUrl("product");
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("image", image);
    formData.append("product", jsonBlob);
    try {
      await fetch(url, {
        method: "POST",
        body: formData,
      });
      return {
        ok: true,
        data: null,
      };
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      return {
        ok: false,
        data: error,
      };
    }
  }
  return {
    createNewProduct,
  };
}
