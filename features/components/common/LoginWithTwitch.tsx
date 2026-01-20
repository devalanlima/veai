"use client";

import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { supabase } from "@/lib/supabase/clients/createClient";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import Twitch from "@/ui/icons/Twitch";
import { VariantProps } from "class-variance-authority";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginWithTwitch({
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const [supabaseError, setSupabaseError] = useState<string | undefined>();

  async function signInWithTwitch() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitch",
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
        "bg-[#9147ff] hover:bg-[#772ce8] text-white focus:outline-none focus:ring-2 focus:ring-[#9147ff]",
        className,
      )}
      onClick={signInWithTwitch}
    >
      <Twitch />
      Entrar com a Twitch
    </Button>
  );
}
