import PasswordRecoveryForm from "@/features/components/auth/password-recovery/PasswordRecoveryForm";
import BackgroundImage from "@/features/components/common/BackgroundImage";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import VeAi from "@/ui/icons/VeAi";
import SecurityShield from "@/ui/SVG/SecurityShield";
import { Send, Undo2 } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="w-full flex justify-center items-center bg-secondary-light/90 md:bg-transparent md:justify-end md:p-6 lg:p-20 relative max-w-360 mx-auto pt-12">
        <div className="h-15 flex items-center absolute top-0 left-0 justify-center md:mx-6 md:my-4 lg:h-20 lg:mx-20  mx-4 my-2">
          <VeAi />
        </div>
        <Card className="max-w-93.75 lg:w-fit w-full h-full max-h-158 rounded-none md:rounded-md bg-transparent md:bg-secondary-light/90 border-0 md:backdrop-blur-sm lg:p-8 lg:min-w-107 ">
          <div className="flex flex-col items-center gap-4 p-4">
            <SecurityShield />
            <h1 className="title-4 text-foreground">Esqueceu sua Senha?</h1>

            <PasswordRecoveryForm id="password-recovery-form" />

            <div className="w-full">
              <p className="text-center text-foreground">
                Insira o e-mail cadastrado para receber o link de redefinição de
                senha.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full"
              type="submit"
              form="password-recovery-form"
            >
              Enviar Email de Redefinição <Send />
            </Button>

            <div className="flex flex-col items-center">
              <Button asChild className="p-0 h-6 text-primary" variant="link">
                <Link href="/sign-in">
                  <Undo2 />{" "}
                  <span className="text-foreground">Voltar para página de</span>
                  Login
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
