import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewSubcategoryResponse } from "~/interfaces/inventory/subcategory/response/new.subcategory.response";
import type { NewSubcategoryRequest } from "~/interfaces/inventory/subcategory/resquest/new.subcategory.request";
import type { ApiResultType } from "~/types/api.response.type";

export default async function useNewSubcategory(
  subcategory: NewSubcategoryRequest
): Promise<ApiResultType<NewSubcategoryResponse>> {
  const url = useGetApiUrl("subcategory");
  try {
    const request = await $fetch<NewSubcategoryResponse>(url, {
      method: "POST",
      body: subcategory,
    });
    return {
      ok: true,
      data: request,
    };
  } catch (e: any) {
    const error = e.data as ErrorResponse;
    return {
      ok: false,
      data: error,
    };
  }
}
