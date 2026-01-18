"use client";

import { InputText } from "@/ui/InputText";
import { Mail, RefreshCcw, Send } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import {
  PasswordRecovery,
  passwordRecoverySchema,
} from "@/features/schemas/auth/password-recovery/PasswordRecoverySchema";
import { Button } from "@/ui/button";
import { formatZodErrors } from "@/lib/formatZodErrors";

export default function PasswordRecoveryForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordRecovery, string>>
  >({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const data: PasswordRecovery = {
      email: formData.get("email") as string,
    };

    const result = passwordRecoverySchema.safeParse(data);

    if (result.success) {
      console.log("Form válido:", result.data);
      // TODO
      setEmailSent(true);
    } else {
      setErrors(formatZodErrors(result.error));
    }
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className="min-h-50 flex flex-col gap-2"
    >
      {!emailSent && (
        <InputText
          name="email"
          type="email"
          icon={Mail}
          placeholder="Email"
          autoComplete="email"
          errorMessage={errors.email}
        />
      )}
      <div className="w-full">
        {emailSent ? (
          <p className="text-center">
            Se o email estiver cadastrado, você receberá um link para redefinir
            a senha.
          </p>
        ) : (
          <p className="text-center text-foreground">
            Insira o e-mail cadastrado para receber o link de redefinição de
            senha.
          </p>
        )}
      </div>

      <div className="h-full flex justify-end items-end">
        <Button size="lg" className="w-full" type="submit">
          {emailSent ? (
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
