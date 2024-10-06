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
});
