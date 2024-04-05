export type LoginType = {
  email: string;
  password: string;
}

export type RegisterType = LoginType & {
  name: string;
}