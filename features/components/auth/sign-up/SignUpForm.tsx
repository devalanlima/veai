"use client";

import {
  SignUpSchema,
  signUpSchema,
} from "@/features/schemas/auth/sign-up/SignUpSchema";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Lock, Mail } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";

export default function SignUpForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpSchema, string>>
  >({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: SignUpSchema = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirm-password") as string,
    };

    const result = signUpSchema.safeParse(data);

    if (result.success) {
      console.log("Form válido:", result.data);
      // TODO: Handle successful validation
    } else {
      setErrors(formatZodErrors(result.error));
    }
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      <InputText
        name="email"
        type="email"
        icon={Mail}
        placeholder="Email"
        autoComplete="email"
        errorMessage={errors.email}
      />

      <InputText
        name="password"
        type="password"
        icon={Lock}
        placeholder="Senha"
        autoComplete="new-password"
        errorMessage={errors.password}
      />

      <InputText
        name="confirm-password"
        type="password"
        icon={Lock}
        placeholder="Repita a Senha"
        autoComplete="new-password"
        errorMessage={errors.confirmPassword}
      />

      <Button size="lg" className="w-full" type="submit">
        Criar Conta
      </Button>
    </form>
  );
}
