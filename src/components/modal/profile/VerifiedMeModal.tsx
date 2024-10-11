"use client";
import { useCreatePayment } from "@/src/hooks/user.mutate.hook";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import PPButton from "../../UI/button/PPButton";
import ModalContainer from "../ModalContainer";
import envConfig from "@/src/config/envConfig";

type TProps = {
  children: ReactNode;
  totalUpvoteofUser: number;
};
const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;

const VerifiedMeModal = ({ children, totalUpvoteofUser }: TProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [continiousButtonLoading, setContiniousButtonLoading] = useState(false);
  const {
    mutate: handlePaymentHook,
    isLoading,
    isSuccess,
    isError,
    data: paymentReturnData,
  } = useCreatePayment();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const isValidPhoneNumber = bdPhoneRegex.test(phoneNumber);
  const router = useRouter();

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  // Payment request handler
  const handlePayment = async () => {
    if (!isValidPhoneNumber) return;
    const paymentData = {
      customerPhone: phoneNumber,
      cancleUrl: `${envConfig?.baseURL}/profile`,
      totalAmount: 5,
    };
    console.log(paymentData);
    setContiniousButtonLoading(true);
    handlePaymentHook(paymentData);
    toast.loading("Payment is processing...");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(paymentReturnData?.data || "/profile");
    }
    if (isError) {
      setContiniousButtonLoading(false);
    }
  }, [isSuccess, paymentReturnData, isError]);

  useEffect(() => {
    setPhoneNumber("");
    setContiniousButtonLoading(false);
  }, [openModal]);
  return (
    <div className="relative">
      <ModalContainer
        isOpen={openModal}
        setIsOpen={setOpenModal}
        triggerElement={children}
        title={"Verify Profile"}
        backdrop="opaque"
        outsideClickToCloseModal={true}
        hideCloseButton={false}
        placement="top"
      >
        {totalUpvoteofUser < 1 ? (
          <div className="text-lg space-y-3">
            <h3>
              Your total upvote is
              <strong className="ml-1 text-red-600">{totalUpvoteofUser}</strong>
            </h3>
            <h4>
              You cannot verify yourself until you received at least
              <strong className="ml-1 text-red-600">1 upvote</strong>
            </h4>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              Verified users cost
              <strong className="mx-1 text-red-600">$5</strong>
              per month.
            </p>

            {/* Phone number input */}
            <div className="relative pb-5">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium"
              >
                Enter your phone number:
              </label>
              <Input
                id="phone-number"
                type="text"
                value={phoneNumber}
                variant="underlined"
                onChange={handlePhoneNumberChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., +8801XXXXXXXXX"
              />
              {!isValidPhoneNumber && phoneNumber && (
                <p className="text-red-600 text-xs mt-2 absolute">
                  Please enter a valid Bangladeshi phone number.
                </p>
              )}
            </div>

            {/* Pay Now button */}
            <PPButton
              onClick={handlePayment}
              buttonText={
                isLoading || continiousButtonLoading
                  ? "Processing..."
                  : "Pay Now"
              }
              isLoading={isLoading || continiousButtonLoading}
              isDisabled={!isValidPhoneNumber}
              className={`text-white `}
            />
          </div>
        )}
      </ModalContainer>
    </div>
  );
};

export default VerifiedMeModal;
