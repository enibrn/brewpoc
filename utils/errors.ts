export class ErrorUtils {
  static manageError(err: unknown): void {
    console.error(err);
    const error = err as Error;
    if (error.message) {
      alert(error.message);
    } else {
      alert('An unknown error occurred.');
    }
  }
}