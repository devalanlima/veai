"use client";

import {
  SignIn,
  signInSchema,
} from "@/features/schemas/auth/sign-in/SignInSchema";
import { formatZodErrors } from "@/lib/formatZodErrors";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { supabase } from "@/lib/supabase/clients/createClient";
import { Button } from "@/ui/button";
import { InputText } from "@/ui/InputText";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, FormHTMLAttributes, useRef, useState } from "react";
import { toast } from "sonner";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
if (!siteKey) console.error("Turnstile key not configured");

export default function SignInForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const [errors, setErrors] = useState<Partial<Record<keyof SignIn, string>>>(
    {},
  );
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const dataUser = useRef<SignIn | null>(null);

  const $turnstile = useRef<TurnstileInstance | null>(null);

  const router = useRouter();

  const validateSchema = (data: SignIn) => {
    const schemaResult = signInSchema.safeParse(data);
    return schemaResult;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrors({});
    setSupabaseError(null);

    const formData = new FormData(e.currentTarget);

    const data: SignIn = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
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

  const signIn = async (
    email: string,
    password: string,
    captchaToken: string,
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
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

  const handleOnSuccess = async (captchaToken: string) => {
    if (dataUser.current) {
      const { email, password } = dataUser.current;
      dataUser.current = null;

      const authentication = await signIn(email, password, captchaToken);

      if (authentication.success) {
        router.push("/");
      } else {
        setSupabaseError(authentication.message);
        $turnstile.current?.reset();
      }
      setIsLoading(false);
    } else {
      handleException("Ocorreu um erro ao resgatar os dados do formulário.");
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
        size="lg"
        variant="link"
        className="h-6 underline decoration-1 font-light"
        asChild
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
