interface Client {
  name: string;
  phone: string;
}

interface Transaction {
  typeMovement: string;
  client: Client;
  userId: string;
}

interface Product {
  productId: string;
  quantity: number;
}

interface TransactionRequest {
  transaction: Transaction;
  products: Product[];
}