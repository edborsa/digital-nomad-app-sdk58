import { act, fireEvent, screen } from "@testing-library/react-native";
import { router, SplashScreen } from "expo-router";
import { renderApp } from "../test-utils/renderApp";
import { restartApp } from "../test-utils/restartApp";
import { signIn } from "../test-utils/signIn";

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

// The splash is native UI; recording its calls shows when the app lets it go
jest.mock("expo-router/build/views/Splash", () => ({
  ...jest.requireActual("expo-router/build/views/Splash"),
  hide: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}));

describe("integration: Session", () => {
  it("should restore the Session after a restart without signing in again", async () => {
    await renderApp();
    await signIn("lucas@coffstack.com", "12345678");
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();

    await restartApp();
    await renderApp();

    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
    expect(screen.queryByText("Bem-vindo")).not.toBeOnTheScreen();
  });

  it("should start signed out when the stored Session has expired, without calling the backend", async () => {
    await renderApp();
    await signIn("lucas@coffstack.com", "12345678");
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();

    // A year passes while the app is closed; the router's fake timers own the clock
    jest.setSystemTime(Date.now() + ONE_YEAR);
    await restartApp();
    const getUser = jest.fn();
    const findAll = jest.fn();
    await renderApp({ repositories: { auth: { getUser }, city: { findAll } } });

    expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();
    expect(getUser).not.toHaveBeenCalled();
    expect(findAll).not.toHaveBeenCalled();
  });

  it("should keep protected screens unreachable when signed out", async () => {
    await renderApp({ initialSession: "signedOut" });
    expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();

    await act(() => router.navigate("/profile"));

    expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();
    expect(screen.queryByText("Informações da Conta.")).not.toBeOnTheScreen();
  });

  it("should keep sign-in unreachable when signed in", async () => {
    await renderApp({ initialSession: "signedIn" });
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();

    await act(() => router.navigate("/sign-in"));

    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
    expect(screen.queryByText("Bem-vindo")).not.toBeOnTheScreen();
  });

  it("should not show the previous AuthUser's cached profile after signing out", async () => {
    let getUserCalls = 0;
    await renderApp({
      repositories: {
        auth: {
          // The first AuthUser loads; anyone after that waits for the backend forever
          getUser: () =>
            ++getUserCalls === 1
              ? Promise.resolve({
                  id: "1",
                  email: "lucas@coffstack.com",
                  fullname: "Lucas Garcez",
                  createdAt: "2025-06-23T10:32:55.10671Z",
                })
              : new Promise(() => {}),
        },
      },
    });
    await signIn("lucas@coffstack.com", "12345678");
    await fireEvent.press(await screen.findByText("Perfil"));
    expect(await screen.findByText("Lucas Garcez")).toBeOnTheScreen();

    await fireEvent.press(screen.getByTestId("sign-out-button"));
    await signIn("maria@coffstack.com", "12345678");
    await fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByText("Tema")).toBeOnTheScreen();
    expect(screen.queryByText("Lucas Garcez")).not.toBeOnTheScreen();
  });

  it("should keep the splash screen up until the Session is restored", async () => {
    await renderApp();
    await signIn("lucas@coffstack.com", "12345678");
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();

    const finishRestoring = await restartApp({ holdRestore: true });
    jest.mocked(SplashScreen.hide).mockClear();
    await renderApp();

    expect(SplashScreen.hide).not.toHaveBeenCalled();

    await finishRestoring?.();

    expect(SplashScreen.hide).toHaveBeenCalled();
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
  });

  it("should show an error and stay on sign-in when signing in fails", async () => {
    await renderApp();

    await signIn("nobody@coffstack.com", "12345678");

    expect(await screen.findByText("error ao fazer login")).toBeOnTheScreen();
    expect(screen.getByText("Bem-vindo")).toBeOnTheScreen();
  });
});
