import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  street: z.string(),
  city: z.string(),
  postCode: z.string(),
  state: z.string(),
  addressType: z.string().optional(),
  userId: z.string(),
});
