export function formatAmount(amount: number): string {
  return amount.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatDate(dateStr: string) {
  const locale = navigator.language;
  return new Date(dateStr).toLocaleDateString(locale);
}

export function formatDateWithUTC(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("es-CO", { timeZone: "UTC" });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toLocalISODate(date: Date | null) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatPhone(phone: string) {
  const prefix = `(${phone.slice(0, 3)}) `;
  return `${prefix}${phone.slice(3, 6)}-${phone.slice(6, 10)}-${phone.slice(
    10,
    13,
  )}`;
}
