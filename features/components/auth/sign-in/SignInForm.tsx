"use client";

import { InputText } from "@/ui/InputText";
import { Lock, Mail } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export default function SignInForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const handleLogin = (submit: React.FormEvent<HTMLFormElement>) => {
    submit.preventDefault();

    const form = new FormData(submit.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    alert(`
        Email: ${email}
        Senha: ${password}
        `);
  };

  return (
    <form {...props} onSubmit={handleLogin} className="contents">
      <InputText name="email" type="email" icon={Mail} placeholder="Email" />

      <InputText
        name="password"
        type="password"
        icon={Lock}
        placeholder="Senha"
      />
    </form>
  );
}
