'use client'


import React from "react";

import Link from "next/link";
import NavigationItems from "./NavigationItems";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLogout } from "@/lib/features/auth/authSlice";
import { Button } from "../ui/button";

const AdminHeader = () => {

//   const user = useAppSelector(state => state?.auth?.user);
//   const dispatch = useAppDispatch()

 

//   const handleLogout = () => {
//     dispatch(setLogout())
//   }
  
  return (
    <div className="bg-black text-white">
      <div className="wrapper flex justify-between">
        <h1 className="text-xl mt-2">GoPool</h1>
        <h1 className="font-bold text-3xl mt-7 mb-5">Admin Dashboard</h1>
        <Button variant={"outline"} size="lg" asChild className="button bg-black rounded-full w-1/8 font-bold text-white  hover:border">
            <Link href="/admin/login">Login</Link>
          </Button>
      </div> 
    </div>
  );
};

export default AdminHeader;
