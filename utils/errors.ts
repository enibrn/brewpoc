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
  

  //migliore gestione degli errori
  /*
  {
    "message": "Invalid `email` param: Value must be a valid email address",
    "code": 400,
    "type": "general_argument_invalid",
    "version": "1.6.0"
  }*/
}