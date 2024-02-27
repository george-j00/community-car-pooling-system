"use client";

import React, { useEffect, useState } from "react";
import ProfileAvatar from "./Avatar"; // Assuming this is your custom Avatar component
import { useAppSelector } from "@/lib/hooks";

const UserData = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    id: "",
  });

  const user = useAppSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (user) {
      const userWithUsername = user as {
        _id: string;
        username: string;
        email: string;
      };
      setUserData({
        username: userWithUsername.username || "",
        email: userWithUsername.email || "",
        id: userWithUsername._id || "",
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center w-full  p-4 mx-auto rounded-lg ">
      <ProfileAvatar />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-2">{userData?.username}</h1>
        <h3 className="text-lg mb-1">{userData?.email}</h3>
        <h3 className="text-lg mb-2">Ph: +91 8111942818</h3>
      </div>
      <h2 className="text-xl font-semibold mb-2">Address</h2>
      <p className="text-base leading-loose mb-4">Kannur, Kerala, 670632</p>
    </div>
  );
};

export default UserData;
