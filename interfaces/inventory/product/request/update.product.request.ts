export interface UpdateProductRequest {
  id: string;
  name: string;
  description: string;
  stock: number;
  priceSell: number;
  priceBuy: number;
  subcategoryId: string;
}
