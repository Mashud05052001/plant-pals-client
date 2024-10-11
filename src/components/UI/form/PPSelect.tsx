"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller } from "react-hook-form";

export type TSelectOption = { key: string; label: string };

type TProps = {
  name: string;
  label: string;
  options: TSelectOption[];
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  className?: string;
};

export default function PPSelect({
  name,
  label,
  options,
  variant = "underlined",
  size = "md",
  isDisabled = false,
  className,
}: TProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <Select
            isDisabled={isDisabled}
            {...field}
            label={label}
            variant={variant}
            size={size}
            className={`${className} dark:bg-default-500/20`}
          >
            {options.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
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
