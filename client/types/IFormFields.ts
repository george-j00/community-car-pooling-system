import { Dispatch, SetStateAction } from "react";

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

type FormFields = {
  name: "username" | "email" | "password";
  label: string;
};

type InitialValues = {
  username?: string;
  email: string;
  password: string;
};

export type AuthFormProps = {
  formFields: FormFields[];
  initialValues: InitialValues;
  type: "Register" | "Login";
};
export type RegisterFormProps = {
  formFields: FormFields[];
  initialValues: InitialValues;
  type: "Register" | "Login";
  setIsOtpAvail: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
};
