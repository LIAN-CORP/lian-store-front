import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateSubcategoryRequest } from "~/interfaces/inventory/subcategory/resquest/update.subcategory.resquest";

export default function useUpdateSubcategory() {
  const { errorToast, successToast } = useCreateToast();

  async function update(subcategory: UpdateSubcategoryRequest) {
    try {
      const url = useGetApiUrl("subcategory");
      const result = await $fetch.raw(url, {
        method: "PUT",
        body: subcategory,
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
