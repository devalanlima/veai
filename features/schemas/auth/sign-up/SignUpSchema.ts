import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter ao menos 6 caracteres")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter ao menos um número")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
        "A senha deve conter ao menos um caractere especial"
      ),
    confirmPassword: z
      .string()
      .min(6, "A senha deve conter ao menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
