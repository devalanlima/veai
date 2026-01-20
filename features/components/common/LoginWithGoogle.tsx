"use client";

import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { supabase } from "@/lib/supabase/clients/createClient";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import Google from "@/ui/icons/Google";
import { VariantProps } from "class-variance-authority";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginWithGoogle({
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const [supabaseError, setSupabaseError] = useState<string | undefined>();

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setSupabaseError(
        error.code
          ? getAuthErrorMessage(error.code)
          : "Ocorreu um erro inesperado.",
      );
    } else {
      setSupabaseError("Ocorreu um erro ao criar sua conta.");
    }

    if (supabaseError) {
      toast.error("Event has been created", { position: "top-right" });
    }
  }
  return (
    <Button
      {...props}
      className={cn(
        "bg-white hover:bg-gray-200 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className,
      )}
      onClick={signInWithGoogle}
    >
      <Google />
      Entrar com o Google
    </Button>
  );
}
