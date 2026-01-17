"use client";

import { InputText } from "@/ui/InputText";
import { Mail, RefreshCcw, Send } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import { passwordRecoverySchema } from "@/features/schemas/auth/password-recovery/PasswordRecoverySchema";
import { Button } from "@/ui/button";

export default function PasswordRecoveryForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (submit: React.FormEvent<HTMLFormElement>) => {
    submit.preventDefault();
    setErrorMessage(undefined);

    const form = new FormData(submit.currentTarget);
    const email = form.get("email");
    const result = passwordRecoverySchema.safeParse({ email: email });

    if (result.success) {
      const data = result.data;

      console.log(data);

      setEmailSent(true);
    } else if (result.error) {
      setErrorMessage(result.error.issues[0].message);
    } else {
      setErrorMessage("Erro desconhecido, tente novamente");
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
          errorMessage={errorMessage}
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
        <Button
          size="lg"
          className="w-full"
          type="submit"
          form="password-recovery-form"
        >
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
