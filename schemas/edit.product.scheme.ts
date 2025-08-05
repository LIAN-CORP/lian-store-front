import { string, z } from "zod";
export const EditProductScheme = z.object({
  product: z
    .string()
    .min(10, {
      message: "el nombre debe contener al menos 10 letras",
    })
    .optional(),

  priceSale: z
    .number()
    .positive({
      message: "El precio no puede ser igual a 0",
    })
    .min(50, {
      message: "El precio debe ser mayor a 50 pesos",
    })
    .optional(),
  priceBuying: z
    .number()
    .positive({
      message: "El precio no puede ser igual a 0",
    })
    .min(50, {
      message: "El precio debe ser mayor a 50 pesos",
    })
    .optional(),
  stock: z
    .number()
    .positive()
    .min(0, {
      message: "El stock no puede ser menor a 0",
    })
    .optional(),
  subcategoryId: string().min(1, {
    message: "debe seleccionar uno",
  }),
});
export type editProduct = z.infer<typeof EditProductScheme>;
