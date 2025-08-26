import type { StateProduct } from "~/interfaces/transaction/state.product";

export default function useCartState() {
  const cart = useState<StateProduct[]>("cart", () => []);

  function onGetState() {
    return useState<StateProduct[]>("cart");
  }

  function onDeleteState(id: string) {
    cart.value = cart.value.filter((p) => p.id !== id);
  }

  function onClearState() {
    cart.value = [];
  }

  return {
    cart,
    onGetState,
    onDeleteState,
    onClearState,
  };
}
