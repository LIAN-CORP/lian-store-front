import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateCategory } from "~/interfaces/inventory/category/request/update.category.request";

export default function useUpdateCategory() {
  const { errorToast, successToast } = useCreateToast();

  async function update(category: UpdateCategory) {
    try {
      const url = useGetApiUrl("category");
      const result = await $fetch.raw(url, {
        method: "PUT",
        body: category,
      });
      if (result.status == 200) {
        successToast("se edito correctamente");
      }
    } catch (e: any) {
      const error = e as ErrorResponse;
      errorToast("esto es un error");
    }
  }
  return {
    update,
  };
}
