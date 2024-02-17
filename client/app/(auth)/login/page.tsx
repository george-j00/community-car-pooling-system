"use client";
import AuthForm from "@/components/shared/AuthForm";
import { IRegisterFormFields } from "@/types/IFormFields";

const Register = () => {
  const loginFields: IRegisterFormFields[] = [
    {
      name: "email",
      label: "Email",
    },
    {
      name: "password",
      label: "Password",
    },
  ];

  return (
    <>
      <AuthForm
        formFields={loginFields}
        initialValues={{
          email: "",
          password: "",
        }}
        type="Login"
      />
    </>
  );
};

export default Register;
