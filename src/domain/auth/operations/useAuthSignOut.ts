import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { endSession } from "../endSession";

export function useAuthSignOut() {
  const { auth } = useRepository();
  const queryClient = useQueryClient();

  return useAppMutation<void, void>({
    mutationFn: async () => {
      try {
        await auth.signOut();
      } catch {
        // Revoking is best effort; signing out always completes on the device
      }
    },
    onSuccess: () => endSession(queryClient),
  });
}
