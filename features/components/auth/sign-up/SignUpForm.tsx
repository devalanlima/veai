"use client";

import {
  SignUp,
  signUpSchema,
} from "@/features/schemas/auth/sign-up/SignUpSchema";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { supabase } from "@/lib/supabase/clients/createClient";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Loader2, Lock, Mail } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { toast } from "sonner";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
if (!siteKey) console.error("Turnstile key not configured");

export default function SignUpForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<Partial<Record<keyof SignUp, string>>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const dataUser = useRef<SignUp | null>(null);

  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const $turnstile = useRef<TurnstileInstance | null>(null);

  const router = useRouter();

  const validateSchema = (data: SignUp) => {
    const schemaResult = signUpSchema.safeParse(data);
    return schemaResult;
  };

  const signUp = async (
    email: string,
    password: string,
    captchaToken: string,
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
      },
    });

    if (error) {
      return {
        success: false,
        message: error.code
          ? getAuthErrorMessage(error.code)
          : "Ocorreu um erro inesperado.",
      };
    }

    return { success: true, message: null };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrors({});
    setSupabaseError(null);

    const formData = new FormData(e.currentTarget);
    const data: SignUp = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirm-password") as string,
    };

    const schemaResult = validateSchema(data);

    if (schemaResult.error) {
      setErrors(formatZodErrors(schemaResult.error));
      setIsLoading(false);
    } else {
      dataUser.current = data;
      $turnstile.current?.execute();
    }
  };

  const handleOnSuccess = async (captchaToken: string) => {
    if (dataUser.current) {
      const { email, password } = dataUser.current;
      dataUser.current = null;

      const authentication = await signUp(email, password, captchaToken);

      if (authentication.success) {
        toast.success("Conta criada com sucesso!");
        router.push("/verify-email");
      } else {
        setSupabaseError(authentication.message);
        $turnstile.current?.reset();
      }
      setIsLoading(false);
    } else {
      handleException("Ocorreu um erro ao resgatar os dados do formulário.");
    }
  };

  const resetAuthState = () => {
    $turnstile.current?.reset();
    dataUser.current = null;
    setErrors({});
    setIsLoading(false);
    setSupabaseError(null);
  };

  const handleException = (message: string) => {
    toast.error(message);
    resetAuthState();
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
        autoComplete="new-password"
        errorMessage={errors.password}
        disabled={isLoading}
      />

      <InputText
        name="confirm-password"
        type="password"
        icon={Lock}
        placeholder="Repita a Senha"
        autoComplete="new-password"
        errorMessage={errors.confirmPassword}
        disabled={isLoading}
      />

      <p className="text-destructive">{supabaseError}</p>

      {isLoading ? (
        <Button size="lg" className="w-full" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Criando Conta...
        </Button>
      ) : (
        <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
          Criar Conta
        </Button>
      )}

      {siteKey && (
        <Turnstile
          siteKey={siteKey}
          ref={$turnstile}
          onSuccess={handleOnSuccess}
          onError={() =>
            handleException("Erro ao validar captcha, tente novamente.")
          }
          onExpire={() => handleException("Captcha expirado, tente novamente.")}
          options={{ size: "invisible", execution: "execute" }}
        />
      )}
    </form>
  );
}
