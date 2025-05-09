export type ResponseType<T> = {
  data: T | null;
  error: null | ErrorResponseType;
  success: boolean;
}

export type ErrorResponseType = {
  errId: number;
  isFriendly: boolean;
  errMsg: { message: string };
}

