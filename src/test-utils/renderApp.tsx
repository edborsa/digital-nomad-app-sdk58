import HomeScreen from "@/app/(protected)/(tabs)";
import TabLayout from "@/app/(protected)/(tabs)/_layout";
import ExploreScreen from "@/app/(protected)/(tabs)/explore";
import ProfileScreen from "@/app/(protected)/(tabs)/profile";
import ProtectedLayout from "@/app/(protected)/_layout";
import CityDetails from "@/app/(protected)/city-details/[id]";
import NotFoundScreen from "@/app/+not-found";
import SignInScreen from "@/app/sign-in";
import SignUpScreen from "@/app/sign-up";
import { renderRouter } from "expo-router/testing-library";
import { AppStack } from "../ui/navigation/AppStack";

import { Repositories } from "../domain/Repositories";
import { SessionStatus, useSessionStore } from "../domain/auth/useSessionStore";
import { authUsers } from "../infra/repositories/adapters/inMemory/data/authUsers";
import { issueFakeJwt } from "../infra/repositories/adapters/inMemory/fakeJwt";
import { Toast } from "../infra/feedbackService/adapters/Toast/Toast";
import { ToastFeedback } from "../infra/feedbackService/adapters/Toast/ToastFeedback";
import { FeedbackProvider } from "../infra/feedbackService/FeedbackProvider";
import { InMemoryRepository } from "../infra/repositories/adapters/inMemory";
import { RepositoryProvider } from "../infra/repositories/RepositoryProvider";

import UpdatePasswordScreen from "@/app/(protected)/update-password";
import UpdateProfileScreen from "@/app/(protected)/update-profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clonedeep from "lodash.clonedeep";
import merge from "lodash.merge";
import { queryClientOptions } from "./queryClientOptions";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function renderApp(options?: {
  /** Applied to the Session store; when left out, the Session is whatever was restored */
  initialSession?: Exclude<SessionStatus, "restoring">;
  repositories?: DeepPartial<Repositories>;
}) {
  const finalRepository: Repositories = merge(
    clonedeep(InMemoryRepository),
    options?.repositories ?? {},
  );

  const client = new QueryClient(queryClientOptions);

  if (options?.initialSession === "signedIn") {
    useSessionStore.getState().signIn(issueFakeJwt(authUsers[0].id));
  } else if (options?.initialSession === "signedOut") {
    useSessionStore.getState().signOut();
  }

  function Wrapper({ children }: React.PropsWithChildren) {
    return (
      <QueryClientProvider client={client}>
        <FeedbackProvider value={ToastFeedback}>
          <RepositoryProvider value={finalRepository}>
            {children}
            <Toast />
          </RepositoryProvider>
        </FeedbackProvider>
      </QueryClientProvider>
    );
  }

  return renderRouter(
    {
      _layout: () => <AppStack />,
      "(protected)/_layout": () => <ProtectedLayout />,
      "(protected)/(tabs)/_layout": () => <TabLayout />,
      "(protected)/(tabs)/index": () => <HomeScreen />,
      "(protected)/(tabs)/explore": () => <ExploreScreen />,
      "(protected)/(tabs)/profile": () => <ProfileScreen />,
      "(protected)/city-details/[id]": () => <CityDetails />,
      "(protected)/update-profile": () => <UpdateProfileScreen />,
      "(protected)/update-password": () => <UpdatePasswordScreen />,
      "sign-in": () => <SignInScreen />,
      "sign-up": () => <SignUpScreen />,
      "+not-found": () => <NotFoundScreen />,
    },
    { wrapper: Wrapper, initialUrl: "/" },
  );
}
