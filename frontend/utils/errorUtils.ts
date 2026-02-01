
export const extractErrorMessage = (error: any): string => {
  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string messages
  if (typeof error === 'string') {
    return error;
  }

  // Handle object with message property
  if (error?.message && typeof error.message === 'string') {
    return error.message;
  }

  // Handle axios error response - direct message
  if (error?.response?.data?.message && typeof error.response.data.message === 'string') {
    return error.response.data.message;
  }

  // Handle nested error structure
  if (error?.error?.message && typeof error.error.message === 'string') {
    return error.error.message;
  }

  // Handle nested response error
  if (error?.response?.data?.error?.message && typeof error.response.data.error.message === 'string') {
    return error.response.data.error.message;
  }

  // Fallback
  return 'An error occurred. Please try again.';
};