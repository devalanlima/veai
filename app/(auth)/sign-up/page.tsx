import SignUpForm from "@/features/components/auth/sign-up/SignUpForm";
import BackgroundImage from "@/features/components/common/BackgroundImage";
import LoginWithGoogle from "@/features/components/common/LoginWithGoogle";
import LoginWithTwitch from "@/features/components/common/LoginWithTwitch";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import VeAi from "@/ui/icons/VeAi";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="w-full flex justify-center items-center bg-secondary-light/90 md:bg-transparent md:justify-end md:p-6 lg:p-20 relative max-w-360 mx-auto pt-12">
        <div className="h-15 flex items-center absolute top-0 left-0 justify-center md:mx-6 md:my-4 lg:h-20 lg:mx-20  mx-4 my-2">
          <VeAi />
        </div>
        <Card className="max-w-93.75 lg:max-w-none lg:w-fit w-full h-full max-h-158 rounded-none md:rounded-md bg-transparent md:bg-secondary-light/90 border-0 md:backdrop-blur-sm lg:p-8 lg:min-w-107">
          <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="title-3 text-foreground">Criar Conta</h1>
            <LoginWithGoogle size="lg" className="w-full" />
            <LoginWithTwitch size="lg" className="w-full" />
            <div className="flex gap-2 w-full items-center justify-center">
              <div className="w-full h-px bg-gray rounded-full"></div>
              <p className="text-gray">Ou</p>
              <div className="w-full h-px bg-gray rounded-full"></div>
            </div>

            <SignUpForm id="sign-up-form" />

            <Button
              size="lg"
              className="w-full"
              type="submit"
              form="sign-up-form"
            >
              Criar Conta
            </Button>

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
        <div className="absolute max-w-80 lg:max-w-87 left-0 bottom-0 m-6 lg:m-20 hidden md:block">
          <p className="font-extralight text-sm italic">
            “No futuro, em um planeta remoto, um jovem Predador, rejeitado por
            seu clã, encontra em Thia uma aliada improvável e embarca em uma
            jornada traiçoeira em busca do adversário supremo.”
          </p>
        </div>
      </div>

      <BackgroundImage src="/image.png" alt="Poster" />
    </>
  );
}
