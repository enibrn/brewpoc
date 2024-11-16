import { AppwriteException } from 'appwrite';
import { ParsedError } from './ParsedError';

export class ErrorUtils {
  // obsolete (to be remade in parseError)
  static alertError(err: unknown): void {
    const errorMessage = this.getErrorMessage(err);
    alert(errorMessage);
  }

  // obsolete (to be remade in parseError)
  static getErrorMessage(err: unknown): string {
    console.error(err);
    const error = err as Error;
    if (error.message) {
      return error.message;
    }
    return 'An unknown error occurred.';
  }

  static parseError(err: unknown): ParsedError {
    console.error(err);

    if (err instanceof AppwriteException) {
      const appwriteError = err as AppwriteException;

      if (appwriteError.type === 'general_argument_invalid') {
        return parseAppwriteInvalidArg(appwriteError);
      } else {
        return ParsedError.createWithOtherErrorMessage(appwriteError.message);
      }
    } else if (err instanceof Error) {
      const error = err as Error;
      return ParsedError.createWithOtherErrorMessage(error.message);
    }

    return ParsedError.createWithOtherErrorMessage('An unknown error occurred.');

    function parseAppwriteInvalidArg(appwriteError: AppwriteException): ParsedError {
      try {
        const error = appwriteError.message.split('`');
        const field = error[1];
        const message = error[2].split(': ')[1];
        return ParsedError.createWithFieldError(field, message);
      } catch (error) {
        return ParsedError.createWithOtherErrorMessage(appwriteError.message);
      }
    }
  }
}