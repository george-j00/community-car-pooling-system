'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginFormSchema } from '@/lib/validator';
import { z } from 'zod';
import { useRouter } from "next/navigation";

type IAdminLoginFormFields =  {
    name: "email" | "password";
    label: string;
}

const page = () => {

  const router = useRouter();

    const [loginError, setLoginError] = useState(false);

    const adminLoginFields: IAdminLoginFormFields[] = [
        {
          name: "email",
          label: "Email",
        },
        {
          name: "password",
          label: "Password",
        },
      ];

  const form = useForm({
    resolver: zodResolver(adminLoginFormSchema),
    defaultValues: {
        email:"",
        password:"",
    },
  });
  
    const onSubmit = async (values: z.infer<typeof adminLoginFormSchema>) => {
      const TEST_ADMIN_EMAIL = 'admin@gmail.com';
      const TEST_ADMIN_PASSWORD = '123456';
        if (values?.email === TEST_ADMIN_EMAIL && values?.password === TEST_ADMIN_PASSWORD) {
          router.push('/admin/dashboard');
        }
    };

  return (
    <div className="login-container flex justify-center items-center h-screen ">
      <div className="login-form bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-10 flex flex-col w-full gap-2"
        >
          {adminLoginFields.map((item) => (
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
          {loginError ? (
            <p className="flex text-sm justify-center text-red-600">
              Invalid credentials
            </p>
          ) : null}
          <Button type="submit" className="w-full mt-5">
            Admin Login
          </Button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default page;
