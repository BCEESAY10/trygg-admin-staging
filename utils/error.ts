import axios from 'axios';

interface AxiosErrorResult<T = any> {
  status: number | null;
  message: string;
  data: T | null;
  code?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (err: any) => {
  const { response } = err;
  if (response) {
    const { data, status } = response;
    if (data) {
      return {
        statusCode: err?.statusCode ?? status,
        message: data.message ?? 'An error occurred.',
      };
    }
  }
  return {
    statusCode: err?.statusCode ?? 500,
    message: err.message ?? 'An error occurred.',
  };
};

export function handleAxiosError<T = any>(error: unknown): AxiosErrorResult<T> {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message ?? 'An error occurred',
        data: error.response.data,
        code: error.code,
      };
    } else if (error.request) {
      return {
        status: null,
        message:
          'No response from server. Please check your internet connection.',
        data: null,
        code: undefined,
      };
    } else {
      return {
        status: null,
        message: error.message ?? 'Unexpected Axios error occurred',
        data: null,
        code: error.code,
      };
    }
  } else {
    return {
      status: null,
      message: 'Unexpected error occurred',
      data: null,
    };
  }
}
