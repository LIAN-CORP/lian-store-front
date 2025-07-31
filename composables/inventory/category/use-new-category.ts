import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewCategoryRequest } from "~/interfaces/inventory/category/request/new.category.request";
import type { NewCategoryResponse } from "~/interfaces/inventory/category/response/new.category.response";

export default async function useNewCategory(category: NewCategoryRequest) {
  const url = useGetApiUrl("category");
  try {
    const request = await $fetch<NewCategoryResponse>(url, {
      method: "POST",
      body: category,
    });
    return request;
  } catch (e: any) {
    const error = e.data as ErrorResponse;
    return error;
  }
}
