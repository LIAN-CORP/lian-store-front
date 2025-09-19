import { z } from "zod";
export const NewClientScheme = (t: any) => {
  return z.object({
    email: z
      .string({
        message: t("formError.not_null"),
      })
      .email({
        message: t("formError.email_error"),
      }),
    password: z.string({
      message: t("formError.not_null"),
    }),
  });
};
export type NewClientInferType = z.infer<ReturnType<typeof NewClientScheme>>;
