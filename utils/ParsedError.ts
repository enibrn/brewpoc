export class ParsedError {
  otherErrorMessage: string | null;
  errors: { [field: string]: string; };

  constructor() {
    this.otherErrorMessage = null;
    this.errors = {};
  }

  static createWithFieldError(field: string, message: string): ParsedError {
    const parsedError = new ParsedError();
    parsedError.addError(field, message);
    return parsedError;
  }

  static createWithOtherErrorMessage(message: string): ParsedError {
    const parsedError = new ParsedError();
    parsedError.otherErrorMessage = message;
    return parsedError;
  }

  addError(field: string, message: string) {
    this.errors[field] = message;
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0 || this.otherErrorMessage !== null;
  }
}
