import { Button } from "@nextui-org/react";
import ButtonLoadingIcon from "../icons/buttonLoadingIcon";

type TProps = {
  buttonText?: string;
  buttonType?: "button" | "submit" | "reset";
  variant?: "solid" | "shadow" | "ghost";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  spinnerPlacement?: "start" | "end";
  className?: string;
  onClick?: () => void;
};

export default function FilledButton({
  buttonText = "Submit",
  buttonType = "submit",
  variant = "solid",
  size = "md",
  radius = "sm",
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  spinnerPlacement = "start",
  className,
  onClick,
}: TProps) {
  return (
    <Button
      color="success"
      type={buttonType}
      variant={variant}
      size={size}
      radius={radius}
      isLoading={isLoading}
      isDisabled={isDisabled}
      fullWidth={fullWidth}
      spinnerPlacement={spinnerPlacement}
      spinner={<ButtonLoadingIcon />}
      className={`${className} px-10 text-base`}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
