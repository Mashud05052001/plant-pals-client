"use client";
import { useUserPasswordChange } from "@/src/hooks/auth.mutate.hook";
import { changePasswordValidationSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPButton from "../../UI/button/PPButton";
import PPForm from "../../UI/form/PPForm";
import PPInput from "../../UI/form/PPInput";
import ModalContainer from "../ModalContainer";

type TProps = {
  children: ReactNode;
};

const ChangePasswordModel = ({ children }: TProps) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    mutate: handleChangePassword,
    isLoading,
    isSuccess,
    error,
  } = useUserPasswordChange();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    handleChangePassword(data);
    // setOpenModal(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
    }
  }, [isSuccess]);
  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={children}
        title={"Change Password"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
      >
        <PPForm
          onSubmit={onSubmit}
          resolver={zodResolver(changePasswordValidationSchema)}
        >
          <div className="space-y-4">
            <PPInput label="Old Password" type="password" name="oldPassword" />
            <PPInput label="New Password" type="password" name="newPassword" />
          </div>
          <div className="relative">
            {error && (
              <small className="font-medium absolute top-6 text-red-600">
                {error?.message}
              </small>
            )}
          </div>
          <PPButton
            buttonText="Change Password"
            className="mt-16"
            isLoading={isLoading}
          />
        </PPForm>
      </ModalContainer>
    </div>
  );
};

export default ChangePasswordModel;
