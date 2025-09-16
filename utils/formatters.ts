export function formatAmount(amount: number): string {
  return amount.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatDate(arr: number[]) {
  return new Date(arr[0], arr[1] - 1, arr[2]).toLocaleDateString("es-CO");
}

export function toLocalISODate(date: Date | null) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
