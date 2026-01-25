import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { InputText } from "@/ui/InputText";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/ui/navigation-menu";
import {
  Bookmark,
  Heart,
  House,
  MonitorCheck,
  Popcorn,
  Search,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function BottomNavigation() {
  return (
    <NavigationMenu className="max-h-16 max-w-none w-full bg-secondary-light px-2 [&>*:first-child]:w-full">
      <NavigationMenuList className="grid grid-cols-4 grid-rows-1">
        <NavigationMenuItem className="w-full h-full">
          <NavigationMenuLink asChild>
            <Button
              variant="ghost"
              className="w-full py-2 flex gap-0 flex-col items-center h-full text-xs"
              asChild
            >
              <Link href="/" className="focus:text-primary">
                <House className="w-full size-none text-primary" />
                Início
              </Link>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full gap-0 py-2 flex flex-col items-center h-full text-xs data-[state=open]:bg-primary data-[state=open]:text-background"
              >
                <Send className="w-full size-none -ml-1" />
                Indicações
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen px-6 py-3">
              <DropdownMenuItem className="py-3" asChild>
                <Link href="/saved">
                  <Heart /> Salvas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3" asChild>
                <Link href="/received">
                  <Send className="rotate-180" /> Recebidas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3" asChild>
                <Link href="/sended">
                  <Send /> Enviadas
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full ">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full py-2 flex flex-col gap-0 items-center h-full text-xs data-[state=open]:bg-primary data-[state=open]:text-background"
              >
                <Popcorn className="w-full size-none -ml-1" />
                Filmes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen px-6 py-3">
              <DropdownMenuItem className="py-3" asChild>
                <Link href="/watchlist">
                  <Bookmark /> Lista
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3" asChild>
                <Link href="/watched">
                  <MonitorCheck /> Assistidos
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full ">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full py-2 flex gap-0 flex-col items-center h-full text-xs data-[state=open]:bg-primary data-[state=open]:text-background"
              >
                <Search className="w-full size-none -ml-1" />
                Buscar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen px-6 py-3">
              <div className="py-3">
                <InputText
                  name="Search"
                  type="search"
                  icon={Search}
                  placeholder="Ex.: O Senhor dos Aneis"
                  className="bg-secondary-light"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
