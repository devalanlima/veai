import { z } from "zod";

export const emailField = z.email("Email inválido");

export const passwordField = z
  .string()
  .min(6, "A senha deve ter ao menos 6 caracteres")
  .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
  .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter ao menos um número")
  .regex(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
    "A senha deve conter ao menos um caractere especial",
  );
