import { z } from "zod";
import { requiredMsg } from "./auth.schema";

export const createPostSchema = z.object({
  title: z
    .string({ required_error: requiredMsg })
    .min(4, {
      message: "Title must be at least 4 characters long",
    })
    .max(60, "Title must be less than 60 characters"),
  category: z.string({ required_error: requiredMsg }),
  description: z.string({ required_error: requiredMsg }).min(4, {
    message: "Description must be at least 4 characters long",
  }),
  isPremium: z.boolean().optional(),
});

export const updatePostSchema = z
  .object({
    title: z
      .string({ required_error: requiredMsg })
      .min(4, {
        message: "Title must be at least 4 characters long",
      })
      .max(60, "Title must be less than 60 characters")
      .optional(),
    category: z.string({ required_error: requiredMsg }).optional(),
    description: z
      .string({ required_error: requiredMsg })
      .min(4, {
        message: "Description must be at least 4 characters long",
      })
      .optional(),
    isPremium: z.boolean().optional(),
  })
  .refine(
    (data) => {
      return (
        data.title !== undefined ||
        data.category !== undefined ||
        data.description !== undefined ||
        data.isPremium !== undefined
      );
    },
    {
      message:
        "At least one of title, category, description, or isPremium must be provided.",
    }
  );

export const sendEmailSchema = z.object({
  name: z
    .string({ required_error: requiredMsg })
    .min(3, { message: "*Name must be at least 3 characters" }),
  email: z
    .string({ required_error: requiredMsg })
    .email({ message: "*Provide valid email" }),
  message: z
    .string({ required_error: requiredMsg })
    .min(3, { message: "*Message must be at least 5 characters" }),
});
