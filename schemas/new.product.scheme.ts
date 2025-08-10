import { string, z } from "zod";
export const NewProductScheme = z.object({
  image: z.instanceof(File, { message: "Debes seleccionar una imagen" }),
  product: z.string().min(3, {
    message: "el nombre debe contener al menos 3 letras",
  }),
  description: z.string().min(10, {
    message: "la descripción debe contener al menos 10 letras",
  }),
  priceSale: z
    .number()
    .positive({
      message: "El precio no puede ser igual a 0",
    })
    .min(50, {
      message: "El precio debe ser mayor a 50 pesos",
    }),
  priceBuying: z
    .number()
    .positive({
      message: "El precio no puede ser igual a 0",
    })
    .min(50, {
      message: "El precio debe ser mayor a 50 pesos",
    }),
  category: string().min(1, {
    message: "debe seleccionar uno",
  }),
  stock: z.number().positive().min(0, {
    message: "El stock no puede ser menor a 0",
  }),
  subcategoryId: string(),
});
export type NewProduct = z.infer<typeof NewProductScheme>;
