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
import jwt, { JwtPayload } from "jsonwebtoken";
import { useAppDispatch } from "@/lib/hooks";
import { setLogin } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [error, setError] = useState(false);

  const formSchema = type === "Register" ? registerFormSchema : loginFormSchema;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:");
    if (type === "Register") {
      console.log("this is register", values);
      const response = await userRegistration(values);
      if (typeof response === "string") {
        console.log("Email:", response);
        setError(false);
        setIsOtpAvail(true);
        setEmail(response);
      } else {
       setError(true);
      }
    }
    // const router = useRouter()
    // const dispatch = useAppDispatch()

    if (type === "Login") {
      console.log("this is login values ", values);
      const token = await userLogin(values);
      const decodedToken = jwt.decode(token);
      console.log("decoded token ", decodedToken);
      if (decodedToken && typeof decodedToken === "object") {
        // const userPayload = {
        //   email: (decodedToken as JwtPayload)?.email,
        //   username: (decodedToken as JwtPayload)?.username
        // };
        // dispatch(setLogin({
        //   user: userPayload,
        //   token: token
        // }));
        // router.push("/")
      } else {
        console.error("Failed to decode JWT token");
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
          {
            error ? <p className="flex text-sm justify-center text-red-600">Email already exists</p> : null 
          }
          <Button type="submit" className="w-full mt-5">
            {type === "Register" ? "Register" : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
