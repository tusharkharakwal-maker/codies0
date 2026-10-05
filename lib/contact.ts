import { z } from "zod";

import { services } from "@/data/services";
export { services };

export const budgets = [
  "$5k - $15k",
  "$15k - $30k",
  "$30k - $60k",
  "$60k+",
  "Let's figure it out",
] as const;
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tell us your name (at least 2 characters).")
    .max(100),
  email: z.email("That email doesn't look quite right.").max(254),
  company: z.string().trim().max(150).optional(),
  services: z
    .array(z.enum(services))
    .min(1, "Pick at least one thing we can help with."),
  budget: z.enum(budgets, {
    error: "Choose a budget, or let's figure it out together.",
  }),
  message: z
    .string()
    .trim()
    .min(15, "Give us a little more to go on (at least 15 characters).")
    .max(5000),
  website: z.string().max(0).optional(),
});
export type ContactValues = z.infer<typeof contactSchema>;
