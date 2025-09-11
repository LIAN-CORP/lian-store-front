export const GENERIC_CLIENT = {
  name: "Generic Client",
  phone: "0000000000",
};
export const useTransactionTypes = () => {
  const { t } = useI18n();

  const typeTransaction = ref([
    { name: t("transaction.type.buy"), code: "COMPRA" },
    { name: t("transaction.type.sell"), code: "VENTA" },
    { name: t("transaction.type.credit"), code: "CREDITO" },
  ]);

  return { typeTransaction };
};

export const useTransactionPaymentTypes = () => {
  const { t } = useI18n();

  const typePayment = ref([
    { name: t("transaction.payment.cash"), code: "CASH" },
    { name: t("transaction.payment.transfer"), code: "TRANSFER" },
  ]);

  return { typePayment };
};
