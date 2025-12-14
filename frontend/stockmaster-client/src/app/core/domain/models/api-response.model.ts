export interface ResponseError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: ResponseError;
}
