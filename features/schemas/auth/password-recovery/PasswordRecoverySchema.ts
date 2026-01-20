import { z } from "zod";
import { emailField } from "../common-fields/CommonFields";

export const passwordRecoverySchema = z.object({
  email: emailField,
});

export type PasswordRecovery = z.infer<typeof passwordRecoverySchema>;
