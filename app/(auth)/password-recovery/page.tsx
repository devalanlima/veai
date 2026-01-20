import AuthLayout from "@/features/components/auth/layout/AuthLayout";
import PasswordRecoveryForm from "@/features/components/auth/password-recovery/PasswordRecoveryForm";
import { AnimatedWrapper } from "@/ui/AnimatedWrapper";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import SecurityShield from "@/ui/SVG/SecurityShield";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <AuthLayout>
      <Card className="max-w-93.75 w-full h-full max-h-158 rounded-none md:rounded-md bg-transparent md:bg-secondary-light/90 border-0 md:backdrop-blur-sm lg:p-8 lg:min-w-107 md:border-t-5 border-primary">
        <div className="flex flex-col items-center gap-4 p-4 justify-between h-full">
          <h1 className="title-4 text-foreground">Esqueceu sua Senha?</h1>
          <div className="w-full grid place-items-center">
            <AnimatedWrapper
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            >
              <SecurityShield />
            </AnimatedWrapper>
          </div>

          <PasswordRecoveryForm />

          <div className="flex flex-col items-center">
            <Button asChild className="p-0 h-6 text-primary" variant="link">
              <Link href="/sign-in">
                <Undo2 />
                <span className="text-foreground">Voltar para página de</span>
                <span className="-ml-1">Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
}
