import { z } from "zod";
import { requiredMsg } from "./auth.schema";

export const createPostSchema = z.object({
  title: z
    .string({ required_error: requiredMsg })
    .min(4, {
      message: "Title must be at least 4 characters long",
    })
    .max(20, "Title must be less than 20 characters"),
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
      .max(20, "Title must be less than 20 characters")
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
