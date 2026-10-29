import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { errorUtils } from "@/src/utils/errorUtils";
import { useSessionStore } from "../useSessionStore";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();
  const startSession = useSessionStore((state) => state.signIn);

  const { mutate, error, isPending } = useAppMutation<
    string,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (token, { email }) => {
      startSession(token);
      feedbackService.send({
        type: "success",
        message: `signed in: ${email}`,
      });
    },
    onError: (error) => {
      feedbackService.send({
        type: "error",
        message: "error ao fazer login",
        description: errorUtils.getErrorMessage(error),
      });
    },
  });

  return {
    mutate,
    error,
    isPending,
  };
}
