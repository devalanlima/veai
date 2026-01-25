import { getAuthErrorMessage } from "@/lib/getAuthErrorMessage";
import { supabase } from "@/lib/supabase/clients/createClient";
import { Tables } from "@/types/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { create } from "zustand";

type Profile = Tables<"profiles">;

interface AuthStore {
  user: User | null;
  profile?: Profile | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setIsHydrated: () => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    profile: null,
    isHydrated: false,
    setIsHydrated: () => set({ isHydrated: true }),
    setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
    setProfile: (profile) => set({ profile }),
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(
          error.code ? getAuthErrorMessage(error.code) : error.message,
        );
      }
      set({ user: null, isAuthenticated: false, profile: null });
    },
  };
});
