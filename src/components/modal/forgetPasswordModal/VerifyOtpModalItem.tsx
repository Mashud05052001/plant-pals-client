import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TSetModalContent } from "./ForgetPasswordModal";
import { useUserCheckResetCode } from "@/src/hooks/auth.mutate.hook";
import OTPInput from "react-otp-input";
import FilledButton from "../../UI/button/FilledButton";

type TVerifyOtpModalItem = {
  resetEmail: string;
  otp: string;
  setModalContent: TSetModalContent;
  setOtp: Dispatch<SetStateAction<string>>;
};

const VerifyOtpModalItem = ({
  setModalContent,
  otp,
  setOtp,
  resetEmail,
}: TVerifyOtpModalItem) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    mutate: handleCheckResetCode,
    isSuccess,
    error,
    isLoading,
  } = useUserCheckResetCode();
  const onSubmit = () => {
    if (!/^\d{6}$/.test(otp)) {
      setErrorMessage("OTP must be a 6-digit number.");
      return;
    }
    const data = {
      code: otp,
      email: resetEmail,
    };
    handleCheckResetCode(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setOtp(otp);
      setModalContent("resetPass");
    }
  }, [isSuccess]);
  return (
    <>
      <p>
        An OTP has been sent to your email. Please enter the code to verify your
        identity.
      </p>
      <div className="">
        <div className="mt-2 relative">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={() => <p className="px-1">-</p>}
            renderInput={(props) => (
              <input
                {...props}
                className="mx-1 rounded-md border-2 border-gray-400 w-20"
                onFocus={() => setErrorMessage("")}
              />
            )}
            inputStyle={{ width: "100%", height: "2rem" }}
          />
          {errorMessage && (
            <div className="absolute left-1 bottom-[-1.5rem] text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
              <small>{errorMessage}</small>
            </div>
          )}
        </div>
        {/* Error Message */}
        <div className="text-red-600 font-medium ml-1 text-xs mb-6">
          {error && <p className="mt-7">{error?.message}</p>}
        </div>
        <FilledButton
          onClick={onSubmit}
          buttonText="Verify OTP"
          className="mt-4"
          isLoading={isLoading}
          isDisabled={otp.length !== 6}
        />
      </div>
    </>
  );
};

export default VerifyOtpModalItem;
