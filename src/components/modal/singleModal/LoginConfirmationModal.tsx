"use client";
import Link from "next/link";
import { useState } from "react";
import PPButton from "../../UI/button/PPButton";
import ModalContainer from "../ModalContainer";

type TProps = {
  children: React.ReactNode;
  redirect?: string;
};

const LoginConfirmationModal = ({ children, redirect = "/" }: TProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={children}
        title={"Login Required"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
        size="md"
      >
        <div className="text-left ">
          <p className="text-gray-700 mb-4">
            In order to submit your queued data, you need to login.
            {/* If you want to do this now, you will be redirected, and lose unsaved
            information. */}
          </p>
          <p className="text-gray-700 mb-8">
            Would you like to login now or later?
          </p>

          <div className="flex justify-end space-x-6 ">
            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-all"
            >
              Later
            </button>
            <Link href={`/login?redirect=${redirect}`}>
              <PPButton
                buttonText="Log In Now"
                variant="solid"
                className=" text-white py-2 px-4 rounded-md transition-all"
              />
            </Link>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default LoginConfirmationModal;
