import { z } from "zod";
export const UpdateSubcategoryScheme = (t: any) => {
  return z.object({
    subcategory: z
      .string({
        message: t("formError.not_null"),
      })
      .min(3, {
        message: t("formError.min_length", { size: 3 }),
      })
      .max(50, {
        message: t("formError.max_length", { size: 50 }),
      }),
    description: z
      .string({
        message: t("formError.not_null"),
      })
      .min(5, {
        message: t("formError.min_length", { size: 5 }),
      })
      .max(200, {
        message: t("formError.max_length", { size: 200 }),
      }),
  });
};
export type updateSubcategoryInferType = z.infer<
  ReturnType<typeof UpdateSubcategoryScheme>
>;
