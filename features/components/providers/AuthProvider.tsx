"use client";

import { useAuthStore } from "@/features/stores/auth/authStore";
import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { supabase } from "@/lib/supabase/clients/createClient";
import { Session } from "@supabase/supabase-js";

import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const { setUser, setIsHydrated, setProfile, logout } = useAuthStore();

  useEffect(() => {
    const cleanUrl = () => {
      if (window.location.hash || window.location.search.includes("code=")) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    };
    const handleProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        toast.error(getAuthErrorMessage(error.code));
      } else if (data) {
        setProfile(data);
      }
    };

    const syncUser = (session: Session) => {
      setUser(session.user);
      handleProfile(session.user.id);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (!session?.user) {
          logout();
        } else {
          syncUser(session);
        }
      } else if (event === "SIGNED_IN") {
        if (session?.user) {
          syncUser(session);
          cleanUrl();
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      } else if (event === "PASSWORD_RECOVERY") {
      } else if (event === "TOKEN_REFRESHED") {
      } else if (event === "USER_UPDATED") {
        if (session?.user) {
          syncUser(session);
          cleanUrl();
        }
      }

      setIsHydrated();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [logout, setProfile, setUser, setIsHydrated]);
  return <>{children}</>;
}
