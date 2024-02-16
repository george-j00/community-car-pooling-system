"use client";
import AuthForm from "@/components/shared/AuthForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/lib/validator";
import { IRegisterFormFields } from "@/types/IFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Register = () => {

  const registerFields : IRegisterFormFields = [
    {
      name: "username",
      label: "Username",
    },
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
        formFields={registerFields}
        inititalValues={{
          username: "",
          email: "",
          password: "",
        }}
        type={"Register"}
      />
    </>
  );
};

export default Register;
