"use client";

import EmptyBox from "@/ui/SVG/EmptyBox";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const email = useSearchParams().get("email");

  return (
    <div className="max-w-79 flex flex-col gap-2">
      <p className="text-center text-foreground">
        Enviamos um e-mail de confirmação para{" "}
        <span className="font-medium text-primary">{email}</span>.
      </p>
      <EmptyBox />
      <p className="text-center text-foreground">
        Verifique sua caixa de entrada ou spam e clique no link para ativar sua
        conta.
      </p>
    </div>
  );
}
