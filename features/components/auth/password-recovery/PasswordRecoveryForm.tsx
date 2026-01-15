"use client";

import { InputText } from "@/ui/InputText";
import { Mail } from "lucide-react";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export default function PasswordRecoveryForm({
  ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  const HandleSubmit = (submit: React.FormEvent<HTMLFormElement>) => {
    submit.preventDefault();

    const form = new FormData(submit.currentTarget);
    const email = form.get("email");
    alert(`
        Email: ${email}
        `);
  };

  return (
    <form {...props} onSubmit={HandleSubmit} className="contents">
      <InputText name="email" type="email" icon={Mail} placeholder="Email" />
    </form>
  );
}
