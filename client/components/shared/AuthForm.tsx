"use client";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import { AuthFormProps } from "@/types/IFormFields";

import OtpForm from "./OtpForm";

const AuthForm = ({ formFields, initialValues, type }: AuthFormProps) => {
  const [IsOtpAvail, setIsOtpAvail] = useState(false);
  const [email, setEmail] = useState<string | undefined>();

  return (
    <>
      {IsOtpAvail ? (
        <OtpForm email={email} />
      ) : (
        <RegisterForm
          formFields={formFields}
          initialValues={initialValues}
          type={type}
          setIsOtpAvail={setIsOtpAvail}
          setEmail={setEmail}
        />
      )}
    </>
  );
};

export default AuthForm;
