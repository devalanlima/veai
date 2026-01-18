import { supabaseAuthErrorsPTBR } from "./i18n/supabaseAuthErrors";

export function getAuthErrorMessage(code: string) {
  return (
    supabaseAuthErrorsPTBR[code as keyof typeof supabaseAuthErrorsPTBR] ??
    "Erro desconhecido."
  );
}
