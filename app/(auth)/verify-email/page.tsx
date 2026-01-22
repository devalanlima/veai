import AuthLayout from "@/features/components/auth/layout/AuthLayout";
import VerifyEmail from "@/features/components/auth/verify-email/VerifyEmail";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <AuthLayout>
      <Card className="max-w-93.75 lg:w-fit w-full rounded-none md:rounded-md bg-transparent md:bg-secondary-light/90 border-0 md:backdrop-blur-sm lg:p-8 lg:min-w-107 md:border-t-5 border-primary">
        <div className="flex flex-col items-center gap-4 p-4">
          <h1 className="title-3 text-foreground">Verificar Conta</h1>

          <VerifyEmail />

          <div className="flex flex-col items-center">
            <p className="text-foreground">Já possui uma conta?</p>
            <Button asChild className="p-0 h-6 text-primary" variant="link">
              <Link href="/sign-in">
                Entrar agora <LogIn />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
}
