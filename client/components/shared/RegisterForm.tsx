"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthFormProps, RegisterFormProps } from "@/types/IFormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "@/lib/validator";
import { userLogin, userRegistration } from "@/lib/actions/auth.action";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setLogin } from "@/lib/features/auth/authSlice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const RegisterForm = ({
  formFields,
  initialValues,
  type,
  setIsOtpAvail,
  setEmail,
}: RegisterFormProps) => {
  
  const form = useForm({
    resolver: zodResolver(
      type === "Register" ? registerFormSchema : loginFormSchema
    ),
    defaultValues: initialValues,
  });

  const [signInError, setSignInError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const dispatch = useAppDispatch()
  const router = useRouter()

  const formSchema = type === "Register" ? registerFormSchema : loginFormSchema;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:");
    if (type === "Register") {
      console.log("this is register", values);
      const response = await userRegistration(values);
      if (typeof response === "string") {
        console.log("Email:", response);
        setSignInError(false);
        setIsOtpAvail(true);
        setEmail(response);
      } else {
        setSignInError(true);
      }
    }

    if (type === "Login") {
      console.log("this is login values ", values);
      const response = await userLogin(values);
      if (typeof response === "string") {
        //got error
        setLoginError(true);
      } else {
        setLoginError(false);
        dispatch(setLogin({
          user:response?.data,
          token:response?.token
        }))
        router.push('/');
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-10 bg-gray-50 flex flex-col md:w-1/4 w-2/3 gap-2"
        >
          {formFields.map((item) => (
            <div key={item.name} className="">
              <FormField
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.label} {...field} className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          {signInError ? (
            <p className="flex text-sm justify-center text-red-600">
              Email already exists
            </p>
          ) : null}
          {loginError ? (
            <p className="flex text-sm justify-center text-red-600">
              Invalid credentials
            </p>
          ) : null}
          <Button type="submit" className="w-full mt-5">
            {type === "Register" ? "Register" : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
