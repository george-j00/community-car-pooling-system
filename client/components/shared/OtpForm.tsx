"use client";

import { resendOtp, sendOtp } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
// import router from "next/router";

import { useEffect, useRef, useState } from "react";

type otpFormParams = {
  email: string | undefined;
};

export default function OtpForm({ email }: otpFormParams) {
  const router = useRouter();

  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    // Interval for refreshing after 60 seconds
    const refreshIntervalId = setInterval(() => {
      setTotalTimeRemaining((prevSeconds) => prevSeconds - 1);
      if (totalTimeRemaining === 0) {
        clearInterval(refreshIntervalId);
        // router.refresh();
        window.location.reload();
      }
    }, 1000);

    // // Interval for counting down seconds
    const countdownIntervalId = setInterval(() => {
      if (isTimerRunning) {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        if (secondsRemaining === 0) {
          clearInterval(countdownIntervalId);
          setOtp(["", "", "", ""]);
          setIsTimerRunning(false);
        }
      }
    }, 1000);

    return () => {
      clearInterval(refreshIntervalId);
      clearInterval(countdownIntervalId);
    };
  }, [totalTimeRemaining, secondsRemaining, isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setSecondsRemaining(15);
  };

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);


  const handleChange = (index: number, value: string) => {
    if (/^\d+$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
  
      // Focus on the next input regardless of whether the current digit is filled
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '' && index > 0) {
      // Allow deleting the current digit and focus on the previous input
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = '';
        return newOtp;
      });
      inputRefs.current[index - 1].focus();
    } else if (value === '' && index === 0) {
      // Allow deleting the first digit and focus on the first input
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = '';
        return newOtp;
      });
      inputRefs.current[index].focus();
    }
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    const correctOtp = +enteredOtp;

    if (email) {
      try {
        const response = await sendOtp(email, correctOtp);
        if (response?.message) {
          setOtpError(true);
        } else {
          router.push("/login");
        }
        console.log("otp response", response);
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    }
  };

  // const handleResendOtp = async (e:React.FormEvent<HTMLFormElement>) => {
  const handleResendOtp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (email) {
      resendOtp(email);
      startTimer();
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
                    ref={(el) =>
                      (inputRefs.current[index] = el as HTMLInputElement)
                    }
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
              {
                otpError ? <p className="flex justify-center text-red-500">Invalid OTP </p> : null
              }
              <button
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-gray-900 border-none text-white text-sm shadow-sm"
                type="submit"
              >
                Verify Account
              </button>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                {isTimerRunning ? (
                  <div>
                    <p>Time remaining {secondsRemaining}</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <p>Didn't receive code?</p>
                    <button onClick={handleResendOtp}>resend otp </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
