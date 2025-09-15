export interface GetTransaction {
  id: string;
  typeMovement: string;
  transactionDate: number[];
  client: {
    name: string;
  };
  userId: string;
}
