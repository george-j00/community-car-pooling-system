export type IRegisterFormFields = {
  name: "username" | "email" | "password";
  label: string;
};

export type UserCredentials = {
  username?: string;
  email: string;
  password: string;
};
// export type LoginUserParams = {
//   email: string;
//   password: string;
// };
