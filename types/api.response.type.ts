import type { ErrorResponse } from "~/interfaces/error.response";

export type ApiResultType<T> =
  | { ok: true; data: T }
  | { ok: false; data: ErrorResponse };
