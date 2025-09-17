export interface GetPayment {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  clientId: string;
  transactionId: string;
  debtId: string;
}
