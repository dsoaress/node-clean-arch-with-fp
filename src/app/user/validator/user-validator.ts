import { z } from "zod";

export const userValidator = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
