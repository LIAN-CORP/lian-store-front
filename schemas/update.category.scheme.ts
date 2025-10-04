import { z } from "zod";
export const UpdateCategoryScheme = (t: any) => {
  return z.object({
    category: z
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
      .max(150, {
        message: t("formError.max_length", { size: 150 }),
      }),
  });
};
export type UpdateCategoryInferType = z.infer<
  ReturnType<typeof UpdateCategoryScheme>
>;
