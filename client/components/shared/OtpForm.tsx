"use client";
import Link from "next/link";
import { useRef } from "react";

type otpFormParams = {
  email: string;
};
export default function OtpForm({ email }: otpFormParams) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Function to focus on the next input element
  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <h1 className="font-semibold text-3xl">Email Verification</h1>
          <p className="text-sm font-medium text-gray-400">
            {` We have sent a code to ${email}`}
          </p>
        </div>

        <form action="/api/verify-email" method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="w-16 h-16">
                  <input
                    ref={(el) =>
                      (inputRefs.current[index] = el as HTMLInputElement)
                    }
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name={`code${index + 1}`}
                    id={`code${index + 1}`}
                    maxLength={1} 
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      if (/^\d+$/.test(enteredValue)) {
                        focusNextInput(index);
                      } else {
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-5">
              <button
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-gray-900 border-none text-white text-sm shadow-sm"
                type="submit"
              >
                Verify Account
              </button>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>
                <Link href="/resend-verification-code">resend</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
