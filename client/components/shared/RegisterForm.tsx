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
import { userRegistration } from "@/lib/actions/auth.action";

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

  const formSchema = type === "Register" ? registerFormSchema : loginFormSchema;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:");
    if (type === "Register") {
      console.log("this is register", values);
      const response = await userRegistration(values);
      if (response) {
        setIsOtpAvail(true);
        setEmail(response);
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
          <Button type="submit" className="w-full mt-10">
            {type === "Register" ? "Register" : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
