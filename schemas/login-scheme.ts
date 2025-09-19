import { z } from "zod";
export const LoginScheme = (t: any) => {
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
export type LoginSchemeInferType = z.infer<ReturnType<typeof LoginScheme>>;
