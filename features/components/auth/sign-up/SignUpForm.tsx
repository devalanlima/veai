"use client";

import {
  SignUpSchema,
  signUpSchema,
} from "@/features/schemas/auth/sign-up/SignUpSchema";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { supabase } from "@/lib/supabase/clients/createClient";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Lock, Mail } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import SignUpFormLoading from "./SignUpFormLoading";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";

export default function SignUpForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpSchema, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const [supabaseError, setSupabaseError] = useState<string | undefined>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
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
      const { data, error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
      });

      if (error) {
        setIsLoading(false);
        setSupabaseError(
          error.code
            ? getAuthErrorMessage(error.code)
            : "Ocorreu um erro ao criar sua conta.",
        );
      } else if (data.user) {
        router.push(
          `/verify-email?email=${encodeURIComponent(result.data.email)}`,
        );
      } else {
        setSupabaseError("Ocorreu um erro ao criar sua conta.");
        setIsLoading(false);
      }
    } else {
      setErrors(formatZodErrors(result.error));
      setIsLoading(false);
    }
  };

  return !isLoading ? (
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

      <p className="text-destructive">{supabaseError}</p>

      <Button size="lg" className="w-full" type="submit">
        Criar Conta
      </Button>
    </form>
  ) : (
    <SignUpFormLoading isLoading />
  );
}
