import { z } from "zod";
export const NewCategoryScheme = z.object({
  category: z
    .string({
      message: "no esta el nombre",
    })
    .min(3, {
      message: "necesita 10 letras",
    }),
  description: z
    .string({
      message: "no esta la descripción",
    })
    .min(5, {
      message: "necesita 10 letras",
    }),
});
export type NewCategory = z.infer<typeof NewCategoryScheme>;
