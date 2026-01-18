import { z } from "zod";

export const passwordRecoverySchema = z.object({
  email: z.email("Email inválido"),
});

export type PasswordRecovery = z.infer<typeof passwordRecoverySchema>;
