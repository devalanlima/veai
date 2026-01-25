"use client";

import VeAi from "@/ui/icons/VeAi";
import { InputText } from "@/ui/InputText";
import { Search } from "lucide-react";
import { DropdownMenuBasic } from "./DropdownMenuBasic";
import { MenuUser } from "./MenuUser";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/features/stores/auth/authStore";
import { Skeleton } from "@/ui/skeleton";
import { usePathname } from "next/navigation";

interface Props {
  hideOnRoute?: string[];
}

export default function Header({ hideOnRoute = [] }: Props) {
  const { user, isHydrated } = useAuthStore();
  const pathname = usePathname();

  if (hideOnRoute.includes(pathname)) {
    return null;
  }

  return (
    <header className="p-4 bg-secondary-light">
      <div className="flex justify-between items-center gap-4 h-11">
        <div className="h-11 overflow-hidden flex justify-center place-items-center">
          <VeAi className="w-13 h-auto" />
        </div>

        <InputText
          name="Search"
          type="search"
          icon={Search}
          placeholder="Ex.: O Senhor dos Aneis"
          containerClassName="w-full max-w-[733px] hidden md:flex"
        />

        <div className="md:flex justify-center items-center gap-4 h-full">
          <div className="hidden md:flex">
            <DropdownMenuBasic />
          </div>
          {isHydrated ? (
            user ? (
              <MenuUser />
            ) : (
              <Button asChild>
                <Link href="/sign-in">Iniciar Sessão</Link>
              </Button>
            )
          ) : (
            <Skeleton className="h-11 w-11 rounded-full shrink-0" />
          )}
        </div>
      </div>
    </header>
  );
}
