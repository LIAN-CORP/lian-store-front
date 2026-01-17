export interface Client {
  name: string;
  phone: string;
}

interface Transaction {
  typeMovement: string;
  client: Client;
}

interface Product {
  productId: string;
  quantity: number;
}

export interface NewTransactionRequest {
  transaction: Transaction;
  paymentMethod?: string;
  products: Product[];
}
