import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useSessionStore } from "../useSessionStore";

export function useAuthSignOut() {
  const { auth } = useRepository();
  const endSession = useSessionStore((state) => state.signOut);

  const queryClient = useQueryClient();

  return useAppMutation<void, void>({
    mutationFn: async () => {
      try {
        await auth.signOut();
      } catch {
        // Revoking is best effort; signing out always completes on the device
      }
    },
    onSuccess: () => {
      // Nothing cached for this AuthUser is left for the next person on the device
      queryClient.clear();
      endSession();
    },
  });
}
