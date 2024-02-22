import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import NavigationItems from "./NavigationItems";

const Header = () => {
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
            <Link href="#events">Login / Register</Link>
          </Button>

      
      </div>
    </div>
  );
};

export default Header;
