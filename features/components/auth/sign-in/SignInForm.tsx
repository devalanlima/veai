"use client";

import {
  SignInSchema,
  signInSchema,
} from "@/features/schemas/auth/sign-in/SignInSchema";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { supabase } from "@/lib/supabase/clients/createClient";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";

export default function SignInForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInSchema, string>>
  >({});

  const [isLoading, setIsLoading] = useState(false);

  const [supabaseError, setSupabaseError] = useState<string | undefined>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setSupabaseError(undefined);
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const data: SignInSchema = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = signInSchema.safeParse(data);

    if (result.success) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
      });

      if (error) {
        setSupabaseError(
          error.code
            ? getAuthErrorMessage(error.code)
            : "Ocorreu um erro inesperado.",
        );
      } else if (data.user) {
        router.push(`/`);
        return;
      } else {
        setSupabaseError("Ocorreu um erro ao criar sua conta.");
      }
    } else {
      setErrors(formatZodErrors(result.error));
    }
    setIsLoading(false);
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
        disabled={isLoading}
      />

      <InputText
        name="password"
        type="password"
        icon={Lock}
        placeholder="Senha"
        autoComplete="current-password"
        errorMessage={errors.password}
        disabled={isLoading}
      />

      {supabaseError && (
        <p className="text-destructive text-center">{supabaseError}</p>
      )}

      <Button
        asChild={!isLoading}
        size="lg"
        variant="link"
        className="h-6 underline decoration-1 font-light"
        disabled={isLoading}
      >
        <Link href="/password-recovery">Esqueceu sua senha?</Link>
      </Button>

      {isLoading ? (
        <Button size="lg" className="w-full" disabled>
          <Loader2 className="animate-spin" /> Entrando
        </Button>
      ) : (
        <Button size="lg" className="w-full" type="submit">
          Entrar
        </Button>
      )}
    </form>
  );
}
