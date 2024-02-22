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

const formSchema = z.object({
  carName: z
    .string()
    .min(2, { message: "Car name must be at least 2 characters." }),
  type: z.string().optional(),
  model: z.string().optional(),
  capacity: z.number().min(4, { message: "Please enter passanger capactiy" }),
  vehicleNumber: z
    .string()
    .min(4, { message: "Vehicle number must be at least 4 characters." }),
  fuelType: z.enum(["Petrol", "Diesel", "Electric"]), 
});

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carName: "",
      type: "",
      model: "",
      capacity: 3,
      vehicleNumber: "",
      fuelType: "Petrol", // Set default fuel type
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission here, e.g., send data to a server
    console.log(values);
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
                    <Input className="bg-gray-900" placeholder="Enter car name" {...field} />
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
                    <Input className="bg-gray-900" placeholder="Enter car type" {...field} />
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
                    <Input className="bg-gray-900" placeholder="Enter car model" {...field} />
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
                    className="bg-gray-900"
                      type="number"
                      placeholder="Enter seating capacity"
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
              name="vehicleNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-900" placeholder="Enter vehicle number" {...field} />
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
                        <SelectTrigger  className="bg-gray-900">
                          <SelectValue   placeholder="Select a verified email to display" />
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
          <Button className="bg-gray-100 mt-5 mb-5 text-black rounded-full w-full" type="submit">Add Car</Button>
        </form>
      </Form>
    </>
  );
};

export default page;
