'use client'


import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import NavigationItems from "./NavigationItems";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLogout } from "@/lib/features/auth/authSlice";
import { deleteCookie } from "@/lib/actions/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header = () => {

  const user = useAppSelector(state => state?.auth?.user);
  const dispatch = useAppDispatch()
  const router = useRouter()
 

  const handleLogout = async () => {
    await deleteCookie()
    dispatch(setLogout())
    router.replace('/login')
  }
  
  return (
    <div className="bg-black text-white">
      <div className="wrapper flex justify-between">
        <h1 className="text-xl mt-2">GoPool</h1>
        <div className="flex flex-row gap-10 items-center">
          <NavigationItems />
        </div>
        <Button
            size="lg"
            asChild
            className="button rounded-full font-bold border bg-black text-white hover:bg-white hover:text-black hover:border"
          >
           {
            user ? <button onClick={handleLogout}><Link href="">Logout</Link></button> : <Link href="/login">Login</Link>
           } 

          </Button>
      </div> 
    </div>
  );
};

export default Header;
