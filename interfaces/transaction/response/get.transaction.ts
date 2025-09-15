export interface GetTransaction {
  id: string;
  typeMovement: string;
  transactionDate: number[];
  client: {
    name: string;
    phone: string;
  };
  userId: string;
}
