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

export default function Page() {
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
  }, [isSuccess]);
  return (
    <div>
      <CenterContainer className="w-[100vw]">
        <PPForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="space-y-6 mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white p-7 shadow-lg sm:p-10  border-common-300">
            <h1 className="text-3xl font-semibold tracking-tight text-common-700">
              Register
            </h1>
            <PPInput name="name" label="Name" type="text" />
            <PPInput name="email" label="Email" type="email" />
            <PPInput name="password" label="Password" type="password" />
            <PPInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />

            {/* Error Message & Forget Password */}
            <div className="text-xs">
              {error ? (
                <p className="text-red-600 font-medium ml-1">
                  {/* {(error as TError)?.data?.message} */}
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
              Don&apos;t have an account?
              <Link href="/login" className="font-semibold underline ml-1">
                Login
              </Link>
            </p>
          </div>
        </PPForm>
      </CenterContainer>
    </div>
  );
}
