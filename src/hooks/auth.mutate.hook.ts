import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  changePasswordService,
  checkResetCodeService,
  forgetPasswordService,
  loginUserService,
  registerUserService,
  resetPasswordService,
} from "../services/auth.mutate.service";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (payload: FieldValues) =>
      await registerUserService(payload),
    onSuccess: () => {
      toast.success("User registered successfully");
    },
    onError: (error) => {
      toast.error(`Register failed. ${error?.message}`);
    },
  });
};
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (payload: FieldValues) => await loginUserService(payload),
    onSuccess: () => {
      toast.success("User logged in successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Login failed. ${error?.message}`);
    },
  });
};

export const useUserPasswordChange = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_PASSWORD_CHANGE"],
    mutationFn: async (payload: FieldValues) =>
      await changePasswordService(payload),
    onSuccess: () => {
      toast.success("User password changed successfully");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useUserForgetPassword = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_FORGET_PASSWORD"],
    mutationFn: async (payload: FieldValues) =>
      await forgetPasswordService(payload),
    onSuccess: () => {
      toast.success(
        "Successfully send mail. Please check email to get the verification code"
      );
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useUserCheckResetCode = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_CHECK_RESET_CODE"],
    mutationFn: async (payload: FieldValues) =>
      await checkResetCodeService(payload),
    onSuccess: () => {
      toast.success("Code verified successfully. Please enter a new password");
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
export const useUserResetPassword = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationKey: ["USER_RESET_PASSWORD"],
    mutationFn: async (payload: FieldValues) =>
      await resetPasswordService(payload),
    onSuccess: () => {
      toast.success(
        "Password reset successfully. Please login with new password"
      );
    },
    onError: (error) => {
      toast.error(`Failed. ${error?.message}`);
    },
  });
};
