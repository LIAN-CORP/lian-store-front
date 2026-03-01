import { string, z } from "zod";
export const updateProductScheme = (t: any) => {
  return z
    .object({
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
        })
        .refine((val) => val % 50 == 0, {
          message: t("formError.valid_price"),
        }),
      priceBuying: z
        .number({
          message: t("formError.not_null"),
        })
        .min(50, {
          message: t("formError.min_value", { min: 50 }),
        })
        .refine((val) => val % 50 == 0, {
          message: t("formError.valid_price"),
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
    })
    .superRefine((data, ctx) => {
      if (data.priceSale < data.priceBuying) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("formError.sale_less_than_buy"),
          path: ["priceSale", "priceBuying"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("formError.sale_less_than_buy"),
          path: ["priceBuying"],
        });
      }
    });
};
export type updatedProductInferScheme = z.infer<
  ReturnType<typeof updateProductScheme>
>;
