'use client'

import { sendOtp } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type otpFormParams = {
  email: string | undefined;
};

export default function OtpForm({ email }: otpFormParams) {

  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d+$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const enteredOtp = otp.join("");
    const correctOtp = +enteredOtp

    if (email) {
      try {
        const response = await sendOtp(email, correctOtp);
        if (response) {
          console.log('this is response otp redirect', response);
          router.push(`/`); 
        }
      } catch (error) {
        console.error('OTP verification failed:', error);
      }
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

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {otp.map((digit, index) => (
                <div key={index} className="w-16 h-16">
                  <input
                    ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(index, e.target.value)}
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
