import { z } from "zod";
export const ProductEditScheme = z.object({
  priceSale: z
    .number({
      message: "El precio es requerido",
    })
    .positive({
      message: "El precio no puede ser menor o igual a 0",
    })
    .min(100, {
      message: "El precio debe ser mayor a 100 pesos",
    }),
  priceBuying: z
    .number({
      message: "El precio es requerido",
    })
    .positive({
      message: "El precio no puede ser menor o igual a 0",
    })
    .min(100, {
      message: "El precio debe ser mayor a 100 pesos",
    }),
  stock: z
    .number({
      message: "El precio es requerido",
    })
    .positive({
      message: "El precio no puede ser menor o igual a 0",
    })
    .min(0, {
      message: "El stock no puede ser mayor a 0",
    })
    .optional(),
});
export type ProductEditData = z.infer<typeof ProductEditScheme>;
