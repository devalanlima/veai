import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Bookmark,
  Heart,
  House,
  Menu,
  MonitorCheck,
  Popcorn,
  Send,
} from "lucide-react";
import Link from "next/link";

export function DropdownMenuBasic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-lg">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-60.5 p-6">
        <DropdownMenuItem asChild>
          <Link href="/">
            <House /> Início
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Indicações
            <Send />
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/saved">
              <Heart /> Salvas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/received">
              <Send className="rotate-180" /> Recebidas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sended">
              <Send /> Enviadas
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Filmes
            <Popcorn />
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/watchlist">
              <Bookmark /> Lista
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/watched">
              <MonitorCheck /> Assistidos
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
