import type { StateProduct } from "~/interfaces/transaction/state.product";

export default function useCartState() {
  const cart = useState<StateProduct[]>("cart", () => []);
  const transactionType = useState<string | null>(
    "transactionType",
    () => null
  );

  function onDeleteState(id: string) {
    cart.value = cart.value.filter((p) => p.id !== id);
  }

  function onClearState() {
    cart.value = [];
  }
  function onClearTypeState() {
    transactionType.value = null;
  }

  return {
    cart,
    transactionType,
    onClearTypeState,
    onDeleteState,
    onClearState,
  };
}
