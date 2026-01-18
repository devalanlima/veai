"use client";

import {
  SignInSchema,
  signInSchema,
} from "@/features/schemas/auth/sign-in/SignInSchema";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";

export default function SignInForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInSchema, string>>
  >({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const data: SignInSchema = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = signInSchema.safeParse(data);

    if (result.success) {
      console.log("Form válido:", result.data);
      // TODO
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
        autoComplete="current-password"
        errorMessage={errors.password}
      />

      <Button
        asChild
        size="lg"
        variant="link"
        className="h-6 underline decoration-1 font-light"
      >
        <Link href="/password-recovery">Esqueceu sua senha?</Link>
      </Button>

      <Button size="lg" className="w-full" type="submit">
        Entrar
      </Button>
    </form>
  );
}
