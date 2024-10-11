"use client";
import { useUserProvider } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.mutate.hook";
import { useRouter, useSearchParams } from "next/navigation";

import { loginValidationSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ForgetPasswordModal from "../../modal/forgetPasswordModal/ForgetPasswordModal";
import PPButton from "../../UI/button/PPButton";
import CenterContainer from "../../UI/container/CenterContainer";
import PPForm from "../../UI/form/PPForm";
import PPInput from "../../UI/form/PPInput";
import { FaHome } from "react-icons/fa";

const LoginPage = () => {
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
      router.push(redirect);
    }
  }, [isSuccess]);

  return (
    <div>
      <CenterContainer className="mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white dark:bg-gray-800 p-7 shadow-lg sm:p-10 border-common-300 dark:border-common-700">
        <div className="relative">
          <PPForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold tracking-tight text-common-700 dark:text-common-300">
                  Login
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
          <p className="text-center text-sm text-zinc-700 dark:text-zinc-300 mt-6">
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
};

export default LoginPage;
