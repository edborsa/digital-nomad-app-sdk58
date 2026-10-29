export const APP_ERROR_CODES = [
  "unauthenticated",
  "forbidden",
  "not_found",
  "invalid",
  "network",
  "unknown",
] as const;

export type AppErrorCode = (typeof APP_ERROR_CODES)[number];

/** The one error shape domain code handles, whatever the backend reported */
export class AppError extends Error {
  readonly code: AppErrorCode;
  /** Input fields the error is about, e.g. to show next to a form field */
  readonly fields: string[];

  constructor(code: AppErrorCode, message: string, fields: string[] = []) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.fields = fields;
  }
}
