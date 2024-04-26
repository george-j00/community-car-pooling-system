"use client";

import SearchRide from "@/components/shared/searchRide";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const { toast } = useToast()
  const user = useAppSelector((state) => state?.auth?.user);

  let profileStatus = ""
  if (user) {
    const ExistingUser = user as {
      profileCompletionStatus: string;
    };

    profileStatus = ExistingUser?.profileCompletionStatus;
  }

const router = useRouter()
const handleCreateRide = () => {
  if (user && profileStatus && profileStatus === 'Complete') {
    router.push('/rides/create-ride')
  }else{
    toast({
      variant:"destructive",
      description: "Access denied - Please complete profile to create ride ",
    })
  }
}

  return (
    <>
      <section className="relative bg-black text-white bg-contain md:py-10 w-full h-full">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-10">
            <h1 className="text-6xl font-bold leading-tight">
              <span className="text-gray-400">&quot;</span>Community Cruise:{" "}
              <br />
              Unlocking Mobility <br />
              Together <span className="text-gray-400">&quot;</span>
            </h1>
            <p className="wrapper p-regular-20 md:p-regular-24">
              Explore Your Neighborhood: Discover the Perfect Ride with Our
              Community Car Pool Software. Find the ideal vehicle that matches
              your preferences and budget.
            </p>
            <div className="flex gap-5 justify-center md:justify-start">
              <Button
                size="lg"
                // asChild
                className="button rounded-full w-1/3 font-bold bg-white text-black hover:bg-black hover:text-white hover:border"
                onClick={handleCreateRide}
              >
                Create ride{" "}
                <svg
                  width="55"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Button>

              <SearchRide />
            </div>
            {/* <Button size="lg" asChild className="button rounded-full w-1/3 font-bold bg-white text-black hover:bg-black hover:text-white hover:border">
            <Link href="/rides/available-rides">Show available rides  <svg width="55" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></Link>
          </Button> */}
          </div>

          <Image
            src="/assets/images/carPng.png"
            alt="Landing page car image "
            width={300}
            height={300}
            className="image-size hidden md:block"
          />
        </div>
      </section>
    </>
  );
}
