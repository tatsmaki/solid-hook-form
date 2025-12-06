import type z from "zod";
import { boolean, email, iso, number, object, string } from "zod";

export const formSchema = object({
  date: iso.date(),
  email: email(),
  password: string().min(8),
  profile: object({
    age: number().min(18).max(100),
    name: string().min(1, "Required").max(10)
  }),
  remember: boolean()
}).superRefine((values, ctx) => {
  if (!values.remember) {
    ctx.addIssue({
      code: "custom",
      path: ["remember"],
      message: "Required"
    });
  }
});

export type FormValues = z.infer<typeof formSchema>;
