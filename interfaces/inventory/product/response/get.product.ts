export interface GetProduct {
  id: string;
  imagePath: string;
  name: string;
  description: string;
  stock: number;
  priceSell: number;
  priceBuy: number;
  subcategoryId: string;
  categoryId: string;
}
