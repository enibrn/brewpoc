export type ParsedError = {
  otherErrorMessage: string | null;
  errors: { [key: string]: string };
}