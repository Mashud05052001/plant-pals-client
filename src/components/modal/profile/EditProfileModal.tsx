"use client";
import { useUpdateMe } from "@/src/hooks/user.mutate.hook";
import { TUser } from "@/src/types";
import { ReactNode, useState } from "react";
import ModalContainer from "../ModalContainer";
import PPButton from "../../UI/button/PPButton";
import { FaUserEdit } from "react-icons/fa";
import { Button } from "@nextui-org/react";

type TProps = {
  userData: TUser;
};

const EditProfileModel = ({ userData }: TProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: handleUpdateMe, isLoading, isSuccess } = useUpdateMe();

  const triggerElement = (
    <Button
      type="button"
      variant="faded"
      className="w-fit hover:text-common-600 border-0"
      onClick={() => setOpenModal(true)}
    >
      <div className="flex items-center space-x-2 w-fit  py-1 rounded-md">
        <FaUserEdit className="size-7" />
        <p>Edit Profile</p>
      </div>
    </Button>
  );
  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={triggerElement}
        title={"Update Profile"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
      >
        asd
      </ModalContainer>
    </div>
  );
};

export default EditProfileModel;
