import { z } from "zod";
export const NewPaymentScheme = (t: any) => {
  return z.object({
    amount: z
      .number({
        message: t("formError.not_null"),
      })
      .min(50, {
        message: t("formError.min_value", { min: 50 }),
      }),
    method: z.string().min(1, {
      message: t("formError.not_null"),
    }),
  });
};
export type NewPaymentInferType = z.infer<ReturnType<typeof NewPaymentScheme>>;
