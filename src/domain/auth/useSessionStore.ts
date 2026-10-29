import { secureStorage } from "@/src/infra/storage/adapters/SecureStorage";
import { persistStorage } from "@/src/infra/storage/persistStorage";
import { decodeJwtPayload } from "@/src/utils/jwt";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionStatus = "restoring" | "signedIn" | "signedOut";

type SessionState = {
  status: SessionStatus;
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      status: "restoring",
      token: null,
      signIn: (token) => set({ status: "signedIn", token }),
      signOut: () => set({ status: "signedOut", token: null }),
    }),
    {
      name: "session",
      storage: persistStorage(secureStorage),
      partialize: ({ token }) => ({ token }),
      // Restoring ends here; an expired token is dropped without asking the backend
      onRehydrateStorage: () => (state) => {
        const token = state?.token;
        if (token && !isExpired(token)) {
          useSessionStore.setState({ status: "signedIn" });
        } else {
          useSessionStore.setState({ status: "signedOut", token: null });
        }
      },
    },
  ),
);

/** The id of the AuthUser the current Session belongs to, if signed in */
export function getSessionUserId(): string | undefined {
  const { token } = useSessionStore.getState();
  return token ? decodeJwtPayload(token)?.sub : undefined;
}

function isExpired(token: string) {
  const exp = decodeJwtPayload(token)?.exp;
  return exp === undefined || exp * 1000 <= Date.now();
}
