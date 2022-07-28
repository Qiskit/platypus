export interface LoginWithToken {
  id: string,
  ttl: number,
  created: string,
  userId: string
}

export interface QCHttpError {
  message: string
}
