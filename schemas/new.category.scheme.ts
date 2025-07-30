import { z } from "zod";
export const NewCategoryScheme = z.object({
  name: z
    .string({
      message: "no esta el nombre",
    })
    .min(10, {
      message: "necesita 10 letras",
    }),
  description: z
    .string({
      message: "no esta la descripción",
    })
    .min(10, {
      message: "necesita 10 letras",
    }),
});
export type NewCategory = z.infer<typeof NewCategoryScheme>;
