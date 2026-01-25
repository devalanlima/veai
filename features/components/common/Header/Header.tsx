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

export default function Header() {
  const { user, isHydrated } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 bg-secondary-light gap-4">
      <div className="h-11 pb-1">
        <VeAi />
      </div>

      <InputText
        name="Search"
        type="search"
        icon={Search}
        placeholder="Ex.: O Senhor dos Aneis"
      />

      <DropdownMenuBasic />

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
    </header>
  );
}
