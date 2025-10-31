import { z } from "zod";

export const userSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  website: z.string().optional(),
  picture: z.string().optional(),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
