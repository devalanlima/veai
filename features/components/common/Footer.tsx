import { Card } from "@/ui/card";
import TMDBLogo1 from "@/ui/icons/TMDBLogo1";

export default function Footer() {
  return (
    <footer>
      <Card className="rounded-none flex flex-col items-center text-foreground gap-2 p-4 border-0">
        <div className="flex flex-col items-center">
          <p className="font-light text-xs text-center">
            ©VêAí - Todos os direitos reservados
          </p>
          <p className="font-extralight text-xs text-center">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
        <TMDBLogo1 />
      </Card>
    </footer>
  );
}
