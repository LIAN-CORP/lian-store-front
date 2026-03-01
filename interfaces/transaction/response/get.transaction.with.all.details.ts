import type { GetTransaction } from "./get.transaction";
import type { GetTransactionDetails } from "./get.transaction.details";

export interface GetTransactionWithAllDetails {
  transaction: GetTransaction;
  detail: GetTransactionDetails[];
}
