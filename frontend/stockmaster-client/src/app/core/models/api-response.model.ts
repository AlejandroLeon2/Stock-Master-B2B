export interface ResponseError<T = undefined> {
  code: string;
  message: string;
  details?: T;
}

export interface ApiResponse<T = undefined, U = undefined> {
  success: boolean;
  message: string;
  data?: T;
  error?: ResponseError<U>;
}
