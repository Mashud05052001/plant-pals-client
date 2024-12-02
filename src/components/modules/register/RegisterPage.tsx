"use client";

import PPButton from "@/src/components/UI/button/PPButton";
import CenterContainer from "@/src/components/UI/container/CenterContainer";
import PPForm from "@/src/components/UI/form/PPForm";
import PPInput from "@/src/components/UI/form/PPInput";
import { registerValidationSchema } from "@/src/schemas/auth.schema";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserRegister } from "@/src/hooks/auth.mutate.hook";
import { useUserProvider } from "@/src/context/user.provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";

const RegisterPage = () => {
  const { setIsLoading: setUserLoading } = useUserProvider();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";
  const {
    mutate: handleRegister,
    isLoading,
    error,
    isSuccess,
  } = useUserRegister();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const registerUserData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    handleRegister(registerUserData);
  };
  useEffect(() => {
    if (isSuccess) {
      setUserLoading(true);
      router.replace(redirect);
    }
  }, [isSuccess, redirect, router, isLoading]);
  return (
    <div>
      <CenterContainer className="w-[100vw]">
        <PPForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="space-y-6 mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white dark:bg-gray-800 p-7 shadow-lg sm:p-10 border-common-300 dark:border-common-700">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold tracking-tight text-common-700 dark:text-common-300">
                Register
              </h1>
              {/* Back to Home Button */}
              <Link
                href="/"
                className="font-semibold flex text-green-700 hover:text-green-600 duration-100"
              >
                <FaHome className="size-6 mr-1" />
                <p className="pt-0.5">Back to Home</p>
              </Link>
            </div>
            <PPInput name="name" label="Name" type="text" />
            <PPInput name="email" label="Email" type="email" />
            <PPInput name="password" label="Password" type="password" />
            <PPInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />

            {/* Error Message */}
            <div className="text-xs">
              {error ? (
                <p className="text-red-600 font-medium ml-1">
                  {error?.message}
                </p>
              ) : (
                <p className="opacity-0 select-none">No error</p>
              )}
            </div>

            <PPButton
              buttonText="Register"
              buttonType="submit"
              isLoading={isLoading}
            />

            <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
              Already have an account?
              <Link href="/login" className="font-semibold underline ml-1">
                Login
              </Link>
            </p>
          </div>
        </PPForm>
      </CenterContainer>
    </div>
  );
};

export default RegisterPage;
