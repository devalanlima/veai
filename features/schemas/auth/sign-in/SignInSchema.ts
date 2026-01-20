import { z } from "zod";
import { emailField, passwordField } from "../common-fields/CommonFields";

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type SignIn = z.infer<typeof signInSchema>;
