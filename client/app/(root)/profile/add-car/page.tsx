"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/components/shared/AddCarFormSchema";
import { addCarDetails } from "@/lib/actions/addCar.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { setLogout } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import { getCookie } from "@/lib/actions/auth";


const AddCar =  () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  let userId  = "";

  const user = useAppSelector((state) => state?.auth?.user);
  if (user) {
    const userWithUsername = user as {
      _id: string;
    };

    userId = userWithUsername?._id;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carName: "",
      type: "",
      model: "",
      capacity: 1,
      vehicleNumber: "",
      fuelType: "Petrol",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {

    try {    
    
     const resStatus =  await addCarDetails(values,userId)
     console.log(resStatus);
     
     if (resStatus === 401 ) {
      console.log('res status',resStatus);
      toast({
        variant:"destructive",
        description: "Access denied , please login again",
      })
      router.push('/login')
     }
     if (resStatus === 200) { 
      console.log('car updated successfully');
      toast({
        description: "Car data added successfully",
      })
      form.reset();
     }
    

  } catch (error) {
    if (error instanceof Error && error.message.includes('401')) {
        // setError('Unauthorized. Please login again.');
        router.push('/login'); // Redirect to login AddCar
      } else {
        // setError(error.message); // Handle other errors
      }
  }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 "
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="carName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Car Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-900"
                      placeholder="Enter car name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-900"
                      placeholder="Enter car type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-900"
                      placeholder="Enter car model"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-gray-900"
                      placeholder="Enter seating capacity"
                      {...field}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="vehicleNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-900"
                      placeholder="Enter vehicle number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Fuel Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="bg-gray-100 mt-5 mb-5 text-black rounded-full w-full"
            type="submit"
          >
            Add Car
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddCar;
