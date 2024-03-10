"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// import { Step, ProgressBar } from 'react-step-progress-bar';
import StepProgressBar, { ProgressBar } from "react-step-progress-bar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { updateProfileFormSchema } from "@/lib/validator";
import { updateProfileFormDefaultValues } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCookie } from "@/lib/actions/auth";
import { updateProfile } from "@/lib/actions/addCar.action";
import { updateProfileReducer } from "@/lib/features/auth/authSlice";

const EditProfileDialogBox = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0); // Track active step

  const existingUser: any = useAppSelector((state) => state?.auth?.user);

  // const { car, ...otherUserDetails } = existingUser;

  // const { carName, model, type, capacity, fuelType, vehicleNumber } = car;

  // const flattenedUserData = {
  //   ...otherUserDetails,
  //   carName,
  //   carModel: model,
  //   carType: type,
  //   carCapacity: capacity,
  //   fuelType,
  //   vehicleNumber,
  // };

  const flattenedUserData = {
    ...existingUser,
    carName: existingUser?.car?.carName,
    carModel: existingUser?.car?.model,
    carType: existingUser?.car?.type,
    carCapacity: existingUser?.car?.capacity,
    fuelType: existingUser?.car?.fuelType,
    vehicleNumber: existingUser?.car?.vehicleNumber,
  };

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  const initialValues = existingUser
    ? flattenedUserData
    : updateProfileFormDefaultValues;

  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof updateProfileFormSchema>) => {
    const token = await getCookie();
    console.log(values);

    if (token) {
      const updateProfileData = await updateProfile(
        values,
        token,
        existingUser._id
      );
      dispatch(updateProfileReducer(updateProfileData));
      console.log("data form the server ", updateProfileData);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-white bg-green-800">Edit profile</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[280px] md:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {activeStep === 0
                ? "Fill personal details"
                : activeStep === 1
                ? "Fill Car details"
                : "Driver verification"}
            </DialogTitle>
          </DialogHeader>

          {/* Render the StepProgressBar component */}
          {/* <ProgressBar
            percent={activeStep * 33} // Calculate progress based on step
            steps={[
              { name: "Personal Details" },
              { name: "Car Details" },
              { name: "Driver Verification" },
            ]}
          /> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {activeStep === 0 && ( // Render Personal Details section
                <div className="grid gap-4 py-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Username"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Phone number"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {activeStep === 1 && ( // Render Car Details section
                <div className="grid gap-4 py-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="carName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Car Name"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="carType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Car Type"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="carModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Model</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Car Model"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="carCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Capacity"
                              {...field}
                              className="input-field"
                              onChange={(event) =>
                                field.onChange(Number(event.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Fuel Type"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="vehicleNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Vehicle Number"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <div>
                  <FormField
                    control={form.control}
                    name="carImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car Image</FormLabel>
                        <FormControl>
                          <Input id="carImage" type="file" className="col-span-3" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
                </div>
              )}

              {activeStep === 2 && ( // Render Driver Verification section
                <div className="grid gap-4 py-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="driverLicenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driving License Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Driving License Number"
                              {...field}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Commented out the input field for driving license image as per your format */}
                </div>
              )}

              <DialogFooter className="gap-3">
                {activeStep > 0 && ( // Show "Previous" button if not on first step
                  <Button onClick={handlePrev} className="bg-gray-900">
                    Previous
                  </Button>
                )}
                {activeStep < 2 && ( // Show "Next" button if not on last step
                  <Button onClick={handleNext} className="bg-green-800">
                    Next
                  </Button>
                )}
                {activeStep === 2 && ( // Show "Save" button on last step
                  <Button type="submit" className="bg-orange-300">
                    Save changes
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileDialogBox;
