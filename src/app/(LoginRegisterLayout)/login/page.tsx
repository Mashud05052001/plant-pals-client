"use client";

import PPButton from "@/src/components/UI/button/PPButton";
import CenterContainer from "@/src/components/UI/container/CenterContainer";
import PPForm from "@/src/components/UI/form/PPForm";
import PPInput from "@/src/components/UI/form/PPInput";
import { loginValidationSchema } from "@/src/schemas/auth.schema";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserLogin } from "@/src/hooks/auth.mutate.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProvider } from "@/src/context/user.provider";
import { useEffect } from "react";
import ModalContainer from "@/src/components/modal/ModalContainer";
import ForgetPasswordModal from "@/src/components/modal/forgetPasswordModal/ForgetPasswordModal";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { setIsLoading: setUserLoading } = useUserProvider();
  const {
    mutate: handleLogin,
    isLoading: isLoginLoading,
    error,
    isSuccess,
  } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => handleLogin(data);
  useEffect(() => {
    if (isSuccess) {
      setUserLoading(true);
      // router.replace(redirect);
      // router.push(redirect);
    }
  }, [isSuccess]);
  const defaultdata = {
    email: "masudmahi05@gmail.com",
    password: "12345678",
  };
  return (
    <div>
      <CenterContainer className="mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white p-7 shadow-lg sm:p-10  border-common-300">
        <div className="relative">
          <PPForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
            defaultValues={defaultdata}
          >
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight text-common-700">
                Login
              </h1>
              <PPInput name="email" label="Email" type="email" />
              <PPInput name="password" label="Password" type="password" />

              {/* Error Message & Forget Password */}
              <div className="flex justify-between text-xs pt-3">
                {error ? (
                  <p className="text-red-600 font-medium ml-1">
                    {error?.message}
                  </p>
                ) : (
                  <p className="opacity-0 select-none">No error</p>
                )}
              </div>

              <PPButton
                buttonText="Login"
                buttonType="submit"
                isLoading={isLoginLoading}
              />
            </div>
          </PPForm>
          <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
            Don&apos;t have an account?
            <Link
              href={
                redirect === "/"
                  ? "/register"
                  : `/register?redirect=${redirect}`
              }
              className="font-semibold underline ml-1"
            >
              Register
            </Link>
          </p>
          <div className="absolute right-0 bottom-20">
            <ForgetPasswordModal />
          </div>
        </div>
      </CenterContainer>
    </div>
  );
}
