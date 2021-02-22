export interface BackendResponse<T> {
  data: T,
  success: boolean,
  message?: string,
}

export interface BackendErrorResponse {
  errors: { [key: string]: Array<string> },
  status?: number
  success: false
}