"use client";

import React, { useEffect, useState } from "react";
import ProfileAvatar from "./Avatar"; // Assuming this is your custom Avatar component
import { useAppSelector } from "@/lib/hooks";

const UserData = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    id: "",
    phoneNumber: "",
    profileCompletionStatus: "Incomplete",
  });

  const user = useAppSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (user) {
      const userWithUsername = user as {
        phoneNumber: string;
        _id: string;
        username: string;
        email: string;
        profileCompletionStatus: "Complete" | "Incomplete";
      };
      setUserData({
        username: userWithUsername.username || "",
        email: userWithUsername.email || "",
        id: userWithUsername._id || "",
        phoneNumber: userWithUsername.phoneNumber || "",
        profileCompletionStatus: userWithUsername.profileCompletionStatus,
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center w-full  p-4 mx-auto rounded-lg ">
      <ProfileAvatar />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-2">{userData?.username}</h1>
        <h3 className="text-lg mb-1">{userData?.email}</h3>
        <h3 className="text-lg mb-2">{userData?.phoneNumber}</h3>
      </div>
      <br />
      <div className="flex flex-col justify-center items-center text-center">
        {userData?.profileCompletionStatus === "Complete" ? (
          <div className="flex gap-5 text-green-500 items-center">
            <p className="text-green-500">Completed Profile</p>
            <svg
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        ) : (
          <p className="text-red-500">Incomplete Profile</p>
        )}
        <p className="text-sm text-gray-500">
          You can create rides only if you complete your profile - click edit profile for completing the profile. Ignore if you already have a completed profile. 
        </p>
      </div>
    </div>
  );
};

export default UserData;
