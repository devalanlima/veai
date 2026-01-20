import { z } from "zod";
import { passwordField } from "../common-fields/CommonFields";

export const updatePasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: passwordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
