export interface NewProductRequest {
  name: string;
  description: string;
  stock: number;
  priceSell: number;
  priceBuy: number;
  subcategoryId: string;
}
