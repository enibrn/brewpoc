import { AppwriteException } from 'appwrite';
import { type ParsedError } from '@/types/errorTypes';
export class ErrorUtils {
  // obsolete (remade in parseError)
  static alertError(err: unknown): void {
    const errorMessage = this.getErrorMessage(err);
    alert(errorMessage);
  }

  // obsolete (remade in parseError)
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
        return ErrorUtils.getOtherErrorMessage(appwriteError.message);
      }
    } else if (err instanceof Error) {
      const error = err as Error;
      return ErrorUtils.getOtherErrorMessage(error.message);
    }

    return ErrorUtils.getOtherErrorMessage('An unknown error occurred.');

    function parseAppwriteInvalidArg(appwriteError: AppwriteException): ParsedError {
      try {
        const error = appwriteError.message.split('`');
        const field = error[1];
        const message = error[2].split(': ')[1];
        return ErrorUtils.getFieldError(field, message);
      } catch (error) {
        return ErrorUtils.getOtherErrorMessage(appwriteError.message);
      }
    }
  }

  static getFieldError(field: string, message: string): ParsedError {
    return {
      otherErrorMessage: null,
      errors: {
        [field]: message
      }
    };
  }

  static getOtherErrorMessage(message: string): ParsedError {
    return {
      otherErrorMessage: message,
      errors: {}
    };
  }

  
}