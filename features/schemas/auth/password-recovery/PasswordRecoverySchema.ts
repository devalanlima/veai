import { z } from "zod";

export const passwordRecoverySchema = z.object({
  email: z.email("Email inválido").min(1, "Email obrigatório"),
});

export type PasswordRecovery = z.infer<typeof passwordRecoverySchema>;
