"use client";
import { useUpdateMe } from "@/src/hooks/user.mutate.hook";
import { TUser } from "@/src/types";
import { ReactNode, useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PPInput from "../../UI/form/PPInput";
import PPTextarea from "../../UI/form/PPTextArea";
import PPButton from "../../UI/button/PPButton";

type TProps = {
  userData: TUser;
  children: ReactNode;
};

const EditProfileModel = ({ children, userData }: TProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: handleUpdateMe, isLoading, isSuccess, error } = useUpdateMe();
  const methods = useForm({
    defaultValues: { name: userData.name, bio: userData?.bio || "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Call the mutation to update profile
    handleUpdateMe(data);
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
        title={"Update Profile"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <PPInput label="Name" type="text" name="name" />
            <PPTextarea label="Bio" name="bio" />
            <div className="relative">
              {error && (
                <small className="font-medium absolute top-2 text-red-600">
                  {error?.message}
                </small>
              )}
            </div>
            <PPButton
              buttonText="Update Profile"
              className="mt-12"
              isDisabled={!methods.formState.isDirty}
              isLoading={isLoading}
            />
          </form>
        </FormProvider>
      </ModalContainer>
    </div>
  );
};

export default EditProfileModel;
