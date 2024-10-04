"use client";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TProps = {
  name: string;
  label: string;
  type: "email" | "password" | "text";
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
};

export default function PPInput({
  name,
  label,
  type,
  variant = "underlined",
  size = "md",
}: TProps) {
  const [isVisible, setIsVisible] = useState(false);

  const generateInput = (field: ControllerRenderProps<FieldValues, string>) => {
    const { value, ...restField } = field;
    const inputValue = value || "";
    if (type === "password") {
      return (
        <Input
          value={inputValue}
          {...restField}
          size={size}
          label={label}
          variant={variant}
          type={isVisible ? "text" : "password"}
          className=""
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      );
    }
    return (
      <Input
        value={inputValue}
        {...restField}
        size={size}
        label={label}
        variant={variant}
        type={type}
      />
    );
  };
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          {generateInput(field)}
          {error && (
            <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
              <small>{error.message}</small>
            </div>
          )}
        </div>
      )}
    />
  );
}
