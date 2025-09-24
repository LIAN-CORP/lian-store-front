import { z } from "zod";
export const NewPaymentScheme = (t: any) => {
  return z.object({
    amount: z
      .number({
        message: t("formError.not_null"),
      })
      .min(50, {
        message: t("formError.min_value", { min: 50 }),
      })
      .refine((val) => val % 50 == 0, {
        message: t("formError.valid_price"),
      }),
    method: z
      .string({
        message: t("formError.not_null"),
      })
      .min(1, {
        message: t("formError.min_length", { size: 1 }),
      }),
  });
};
export type NewPaymentInferType = z.infer<ReturnType<typeof NewPaymentScheme>>;
