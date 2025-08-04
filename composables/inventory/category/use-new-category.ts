import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewCategoryRequest } from "~/interfaces/inventory/category/request/new.category.request";
import type { NewCategoryResponse } from "~/interfaces/inventory/category/response/new.category.response";
import type { ApiResultType } from "~/types/api.response.type";

export default async function useNewCategory(
  category: NewCategoryRequest
): Promise<ApiResultType<NewCategoryResponse>> {
  const url = useGetApiUrl("category");
  try {
    const request = await $fetch<NewCategoryResponse>(url, {
      method: "POST",
      body: category,
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
