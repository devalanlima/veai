"use client";

import { formatZodErrors } from "@/lib/formatZodErrors";
import { supabase } from "@/lib/supabase/clients/createClient";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Lock } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import {
  updatePasswordSchema,
  UpdatePassword,
} from "@/features/schemas/auth/update-password/UpdatePasswordSchema";

export default function UpdatePasswordForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdatePassword, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const [supabaseError, setSupabaseError] = useState<string | undefined>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setSupabaseError(undefined);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: UpdatePassword = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirm-password") as string,
    };

    const result = updatePasswordSchema.safeParse(data);

    if (result.success) {
      const { data, error } = await supabase.auth.updateUser({
        password: result.data.password,
      });

      if (error) {
        setIsLoading(false);
        setSupabaseError(
          error.code
            ? getAuthErrorMessage(error.code)
            : "Ocorreu um erro ao atualizar sua senha.",
        );
      } else if (data.user) {
        router.push(`/`);
      } else {
        setSupabaseError("Ocorreu um erro ao atualizar sua senha.");
        setIsLoading(false);
      }
    } else {
      setErrors(formatZodErrors(result.error));
      setIsLoading(false);
    }
  };

  return (
    !isLoading && (
      <form
        {...props}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <InputText
          name="password"
          type="password"
          icon={Lock}
          placeholder="Nova Senha"
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
          Atualizar Senha
        </Button>
      </form>
    )
  );
}
