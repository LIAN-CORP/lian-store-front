export interface NewPaymentRequest {
  amount: number;
  paymentMethod: string;
  clientId: string;
  transactionId: string;
  debtId: string;
}
