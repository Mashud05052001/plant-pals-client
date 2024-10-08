"use client";
import { ReactNode, useState } from "react";
import ModalContainer from "../ModalContainer";
import Image from "next/image";

type TProps = {
  children: ReactNode;
  imgUrl: string;
  idx: number;
};

const SinglePhotoModal = ({ children, imgUrl, idx }: TProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={children}
        title={""}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
        size="2xl"
      >
        <div className="w-full h-full flex justify-center mb-6">
          <div className="rounded-xl border-4 border-common-600 p-2">
            <Image
              src={imgUrl}
              alt={`Image-${idx}`}
              width={500}
              height={500}
              className="rounded-xl"
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default SinglePhotoModal;
