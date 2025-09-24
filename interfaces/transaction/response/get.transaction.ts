export interface GetTransaction {
  id: string;
  typeMovement: string;
  transactionDate: string;
  client: {
    name: string;
    phone: string;
  };
  userId: string;
}
