import { string, z } from "zod";
export const updateProductScheme = (t: any) => {
  return z.object({
    product: z
      .string({
        message: t("formError.not_null"),
      })
      .min(3, {
        message: t("formError.min_length", { size: 3 }),
      })
      .max(100, {
        message: t("formError.max_length", { size: 100 }),
      }),
    description: z
      .string({
        message: t("formError.not_null"),
      })
      .min(10, {
        message: "la descripción debe contener al menos 10 letras",
      })
      .max(200, {
        message: t("formError.max_length", { size: 200 }),
      }),
    priceSale: z
      .number({
        message: t("formError.not_null"),
      })
      .min(50, {
        message: t("formError.min_value", { min: 50 }),
      }),
    priceBuying: z
      .number({
        message: t("formError.not_null"),
      })
      .min(50, {
        message: t("formError.min_value", { min: 50 }),
      }),
    stock: z
      .number({
        message: t("formError.not_null"),
      })
      .min(0, {
        message: t("formError.min_value", { min: 0 }),
      }),
    category: string().min(1, {
      message: t("formError.not_null"),
    }),
    subcategoryId: string().min(1, {
      message: t("formError.not_null"),
    }),
  });
};
export type updatedProductInferScheme = z.infer<
  ReturnType<typeof updateProductScheme>
>;
