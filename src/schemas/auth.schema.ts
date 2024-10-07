import { z } from "zod";
export const requiredMsg = "*required";

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: requiredMsg })
    .email({ message: "*Provide valid email" }),
  password: z
    .string({ required_error: requiredMsg })
    .min(6, { message: "*Password must be at least 6 characters" }),
});

export const registerValidationSchema = z
  .object({
    name: z
      .string({ required_error: requiredMsg })
      .min(3, { message: "*Name must be at least 3 characters" }),
    email: z
      .string({ required_error: requiredMsg })
      .email({ message: "*Provide a valid email" }),
    password: z
      .string({ required_error: requiredMsg })
      .min(6, { message: "*Password must be at least 6 characters" }),
    confirmPassword: z
      .string({ required_error: requiredMsg })
      .min(6, { message: "*Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "*Passwords doesn't match",
    path: ["confirmPassword"],
  });

export const changePasswordValidationSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: requiredMsg,
        invalid_type_error: "Old password must be a string",
      })
      .min(6, { message: "*Password must be at least 6 characters" }),
    newPassword: z
      .string({
        required_error: requiredMsg,
        invalid_type_error: "New password must be a string",
      })
      .min(6, { message: "*Password must be at least 6 characters" }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password cannot be the same as the old password",
    path: ["newPassword"],
  });

export const forgetPasswordValidationSchema = z.object({
  email: z
    .string({ required_error: requiredMsg })
    .email({ message: "*Provide a valid email" }),
});
export const resetPasswordValidationSchema = z.object({
  password: z
    .string({ required_error: requiredMsg })
    .min(6, { message: "*Password must be at least 6 characters" }),
});
