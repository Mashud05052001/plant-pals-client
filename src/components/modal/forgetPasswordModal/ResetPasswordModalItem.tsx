import { Dispatch, SetStateAction, useEffect } from "react";
import { TSetModalContent } from "./ForgetPasswordModal";
import { useUserResetPassword } from "@/src/hooks/auth.mutate.hook";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPForm from "../../UI/form/PPForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordValidationSchema } from "@/src/schemas/auth.schema";
import PPInput from "../../UI/form/PPInput";
import PPButton from "../../UI/button/PPButton";

type TResetPasswordModalItem = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  resetEmail: string;
  otp: string;
  setModalContent: TSetModalContent;
};

const ResetPasswordModalItem = ({
  setOpenModal,
  setModalContent,
  otp,
  resetEmail,
}: TResetPasswordModalItem) => {
  const {
    mutate: handleResetPassword,
    isSuccess,
    error,
    isLoading,
  } = useUserResetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const resetData = {
      email: resetEmail,
      password: data?.password,
      code: otp,
    };
    console.log(resetData);
    handleResetPassword(resetData);
  };
  useEffect(() => {
    if (isSuccess) {
      setModalContent("forgetPass");
      setOpenModal(false);
    }
  }, [isSuccess]);
  return (
    <>
      <p>Please provide your new password to complete the reset process.</p>
      <PPForm
        onSubmit={onSubmit}
        resolver={zodResolver(resetPasswordValidationSchema)}
      >
        <div className="">
          <PPInput label="New Password" name="password" type="password" />
          {/* Error Message */}
          <div className="text-red-600 font-medium ml-1 text-xs mb-6">
            {error && <p className="mt-7">{error?.message}</p>}
          </div>
          <PPButton
            buttonText="Reset Password"
            className="mt-4"
            isLoading={isLoading}
          />
        </div>
      </PPForm>
    </>
  );
};

export default ResetPasswordModalItem;
