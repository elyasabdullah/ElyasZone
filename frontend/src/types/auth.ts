
export type RegistrationData = {
  username: string;
  password: string;
}
export type LoginRequest = {
  username: string,
  password: string
}

export type UserInfo = {
  username: string,
  _id: string,
  accessToken?: string,
  isAuthenticated?: boolean
}