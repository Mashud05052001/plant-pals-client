import { Dispatch, SetStateAction, useEffect } from "react";
import { TSetModalContent } from "./ForgetPasswordModal";
import { useUserForgetPassword } from "@/src/hooks/auth.mutate.hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPForm from "../../UI/form/PPForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordValidationSchema } from "@/src/schemas/auth.schema";
import PPInput from "../../UI/form/PPInput";
import PPButton from "../../UI/button/PPButton";

type TForgetPasswordModalItem = {
  setModalContent: TSetModalContent;
  setResetEmail: Dispatch<SetStateAction<string>>;
};
const ForgetPasswordModalItem = ({
  setModalContent,
  setResetEmail,
}: TForgetPasswordModalItem) => {
  const {
    mutate: handleForgetPassword,
    isSuccess,
    error,
    isLoading,
  } = useUserForgetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setResetEmail(data?.email);
    handleForgetPassword(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setModalContent("otpVerify");
    }
  }, [isSuccess]);
  return (
    <>
      <p>Please enter your email address to receive a verification code.</p>
      <PPForm
        onSubmit={onSubmit}
        resolver={zodResolver(forgetPasswordValidationSchema)}
      >
        <div className="">
          <PPInput label="Email" name="email" type="email" />
          {/* Error Message */}
          <div className="text-red-600 font-medium ml-1 text-xs mb-6">
            {error && <p className="mt-7">{error?.message}</p>}
          </div>
          <PPButton
            buttonText="Submit"
            className={`${error ?? "mt-4"}`}
            isLoading={isLoading}
          />
        </div>
      </PPForm>
    </>
  );
};

export default ForgetPasswordModalItem;
