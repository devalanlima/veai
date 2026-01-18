import AuthLayout from "@/features/components/auth/layout/AuthLayout";
import SignUpForm from "@/features/components/auth/sign-up/SignUpForm";
import LoginWithGoogle from "@/features/components/common/LoginWithGoogle";
import LoginWithTwitch from "@/features/components/common/LoginWithTwitch";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <AuthLayout>
      <Card className="max-w-93.75 lg:w-fit w-full rounded-none md:rounded-md bg-transparent md:bg-secondary-light/90 border-0 md:backdrop-blur-sm lg:p-8 lg:min-w-107">
        <div className="flex flex-col items-center gap-4 p-4">
          <h1 className="title-3 text-foreground">Criar Conta</h1>
          <LoginWithGoogle size="lg" className="w-full" />
          <LoginWithTwitch size="lg" className="w-full" />
          <div className="flex gap-2 w-full items-center justify-center">
            <div className="w-full h-px bg-gray rounded-full"></div>
            <p className="text-gray">Ou</p>
            <div className="w-full h-px bg-gray rounded-full"></div>
          </div>

          <SignUpForm />

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
