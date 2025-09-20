import { z } from "zod";
export const RegisterScheme = (t: any) => {
  return z
    .object({
      firstName: z
        .string({
          message: t("formError.not_null"),
        })
        .min(3, {
          message: t("formError.min_length", { size: 3 }),
        }),
      lastName: z
        .string({
          message: t("formError.not_null"),
        })
        .min(3, {
          message: t("formError.min_length", { size: 3 }),
        }),
      email: z
        .string({
          message: t("formError.not_null"),
        })
        .email({
          message: t("formError.email_error"),
        }),
      birthday: z
        .date({
          required_error: t("formError.not_null"),
        })
        .refine(
          (date) => {
            const today = new Date();
            const minDate = new Date(
              today.getFullYear() - 18,
              today.getMonth(),
              today.getDate()
            );
            return date <= minDate;
          },
          { message: t("formError.must_be_18") }
        ),
      password: z
        .string({
          message: t("formError.not_null"),
        })
        .min(8, {
          message: t("formError.min_length", { size: 8 }),
        })
        .refine((val) => /[A-Z]/.test(val), {
          message: t("formError.password_uppercase"),
        })
        .refine((val) => /[a-z]/.test(val), {
          message: t("formError.password_lowercase"),
        })
        .refine((val) => /[0-9]/.test(val), {
          message: t("formError.password_number"),
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/`~;:+=]/.test(val), {
          message: "La clave debe contener al menos un carácter especial.",
        }),
      confirmPassword: z.string({
        message: t("formError.not_null"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("formError.password_match"),
    });
};
export type RegisterInferType = z.infer<ReturnType<typeof RegisterScheme>>;
