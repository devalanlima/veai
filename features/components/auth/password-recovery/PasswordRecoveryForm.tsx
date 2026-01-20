"use client";

import { InputText } from "@/ui/InputText";
import { Loader2, Mail, RefreshCcw, Send } from "lucide-react";
import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import {
  PasswordRecovery,
  passwordRecoverySchema,
} from "@/features/schemas/auth/password-recovery/PasswordRecoverySchema";
import { Button } from "@/ui/button";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { supabase } from "@/lib/supabase/clients/createClient";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";

const RECOVERY_TIMER_KEY = "password-recovery-timer";

const getInitialTimeLeft = () => {
  if (typeof window === "undefined") return 0;

  const stored = localStorage.getItem(RECOVERY_TIMER_KEY);
  if (!stored) return 0;

  const expiresAt = Number(stored);
  const remaining = Math.floor((expiresAt - Date.now()) / 1_000);

  if (remaining <= 0) {
    localStorage.removeItem(RECOVERY_TIMER_KEY);
    return 0;
  }

  return remaining;
};

export default function PasswordRecoveryForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordRecovery, string>>
  >({});

  const [isLoading, setIsLoading] = useState(false);

  const [supabaseError, setSupabaseError] = useState<string | undefined>();

  const [timeLeftToResendEmail, setTimeLeftToResendEmail] =
    useState<number>(getInitialTimeLeft());

  useEffect(() => {
    if (timeLeftToResendEmail <= 0) return;

    const interval = setInterval(() => {
      setTimeLeftToResendEmail((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(RECOVERY_TIMER_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1_000);

    return () => clearInterval(interval);
  }, [timeLeftToResendEmail]);

  const startResendTimer = () => {
    const expiresAt = Date.now() + 60_000;
    localStorage.setItem(RECOVERY_TIMER_KEY, String(expiresAt));
    setTimeLeftToResendEmail(60);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setErrors({});
    setSupabaseError(undefined);

    const formData = new FormData(e.currentTarget);

    const data: PasswordRecovery = {
      email: formData.get("email") as string,
    };

    const result = passwordRecoverySchema.safeParse(data);

    if (result.success) {
      const { error } = await supabase.auth.resetPasswordForEmail(
        result.data.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_URL}/reset-password`,
        },
      );

      if (error) {
        setIsLoading(false);
        setSupabaseError(
          error.code
            ? getAuthErrorMessage(error.code)
            : "Ocorreu um erro inesperado.",
        );
      } else {
        startResendTimer();
        setEmailSent(true);
        setIsLoading(false);
      }
    } else {
      setErrors(formatZodErrors(result.error));
      setIsLoading(false);
    }
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-between"
    >
      <div className="w-full flex flex-col gap-4 items-center">
        {emailSent ? (
          <p className="text-center text-foreground">
            Se o email estiver cadastrado, você receberá um link para redefinir
            a senha.
          </p>
        ) : (
          <p className="text-center text-foreground">
            Insira o e-mail cadastrado para receber o link de redefinição de
            senha.
          </p>
        )}

        {!emailSent && (
          <InputText
            name="email"
            type="email"
            icon={Mail}
            placeholder="Email"
            autoComplete="email"
            errorMessage={errors.email}
            disabled={isLoading}
          />
        )}
      </div>

      {supabaseError && (
        <p className="text-center text-destructive">{supabaseError}</p>
      )}

      <div className="flex justify-end items-end">
        <Button
          size="lg"
          className="w-full"
          type="submit"
          disabled={isLoading || timeLeftToResendEmail > 0}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Enviando...
            </span>
          ) : timeLeftToResendEmail > 0 ? (
            <span className="flex items-center gap-2">
              Aguarde {timeLeftToResendEmail}s para reenviar
            </span>
          ) : emailSent ? (
            <span className="flex items-center gap-2">
              Re-enviar Email <RefreshCcw />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Enviar Email de Redefinição <Send />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
