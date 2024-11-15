export class ErrorUtils {
  static alertError(err: unknown): void {
    const errorMessage = this.getErrorMessage(err);
    alert(errorMessage);
  }

  static getErrorMessage(err: unknown): string {
    console.error(err);
    const error = err as Error;
    if (error.message) {
      return error.message;
    }
    return 'An unknown error occurred.';
  }
}