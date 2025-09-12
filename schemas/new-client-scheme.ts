import { z } from "zod";
export const NewClientScheme = (t: any) => {
  return z.object({
    clientName: z
      .string({
        message: t("formError.not_null"),
      })
      .min(3, {
        message: t("formError.min_length", { size: 3 }),
      }),
    phone: z
      .string({
        message: t("formError.not_null"),
      })
      .refine((val) => !val.includes("_"), {
        message: t("formError.phone_incomplete"),
      }),
  });
};
export type NewClientInferType = z.infer<ReturnType<typeof NewClientScheme>>;
