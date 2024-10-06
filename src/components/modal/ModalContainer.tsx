"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerElement: ReactNode;
  children: ReactNode;
  title: string;
  outsideClickToCloseModal?: boolean;
  hideCloseButton?: boolean;
  placement?: "bottom" | "bottom-center" | "center" | "top" | "top-center";
  backdrop?: "opaque" | "blur" | "transparent";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
};

const ModalContainer = ({
  isOpen,
  placement = "center",
  setIsOpen,
  triggerElement: openModalDiv = <Button>Open Modal</Button>,
  title,
  outsideClickToCloseModal = true,
  hideCloseButton = false,
  size = "md",
  backdrop = "opaque",
  children,
}: TProps) => {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (outsideClickToCloseModal) setIsOpen(false);
  };

  return (
    <div>
      {/* Modal Open Button */}
      <div
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOpen;
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={isOpen}
        className="z-[100]"
      >
        {openModalDiv}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={handleClose}
        backdrop={backdrop}
        hideCloseButton={hideCloseButton}
        placement={placement}
      >
        <ModalContent className="py-3 px-2">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalContainer;
