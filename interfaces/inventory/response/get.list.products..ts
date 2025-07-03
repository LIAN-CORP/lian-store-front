export interface GetListProducts {
  name: string;
  image?: string;
  description: string;
  priceSell: number;
  stock: number;
  subcategory: {
    name: string;
    category: {
      name: string;
    };
  };
}
