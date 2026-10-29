import { QueryClient } from "@tanstack/react-query";
import { useSessionStore } from "./useSessionStore";

/**
 * Ends the Session on this device. The cache goes first, so nothing cached for
 * this AuthUser is left for the next person when the guards re-render.
 */
export function endSession(queryClient: QueryClient) {
  queryClient.clear();
  useSessionStore.getState().signOut();
}
