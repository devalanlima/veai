"use client";

import { useAuthStore } from "@/features/stores/auth/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";

function UserAvatar({
  avatarUrl,
  username,
}: {
  avatarUrl?: string | null;
  username?: string | null;
}) {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl || ""} alt="avatar image" />
      <AvatarFallback>
        {username ? username.slice(0, 2).toUpperCase() : "VEAI"}
      </AvatarFallback>
    </Avatar>
  );
}

export function MenuUser() {
  const { profile, user, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full focus:outline-primary focus:outline-2">
        <UserAvatar
          avatarUrl={profile?.avatar_url}
          username={profile?.username}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-60.5 p-6">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-2 justify-center items-center py-6">
            <UserAvatar
              avatarUrl={profile?.avatar_url}
              username={profile?.username}
            />
            <div className="flex flex-col justify-center items-center">
              <p>{profile?.username}</p>
              <p className="text-foreground font-light text-sm">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/profile/${profile?.username}`}>
              <UserRound /> Perfil
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={logout}>
            <LogOut /> Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
