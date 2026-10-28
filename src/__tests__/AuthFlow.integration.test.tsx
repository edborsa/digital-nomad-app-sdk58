import { fireEvent, screen } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";
import { signIn } from "../test-utils/signIn";

describe("integration: Auth Flow", () => {
  test("the user can sign-in and sign-out", async () => {
    renderApp();

    await signIn("lucas@coffstack.com", "12345678");

    // verify toast message
    expect(
      await screen.findByText("signed in: lucas@coffstack.com"),
    ).toBeOnTheScreen();

    // verify if home screen was rendered
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
    expect(screen.getByText("Bangkok")).toBeOnTheScreen();

    // press the profile tab
    fireEvent.press(screen.getByText("Perfil"));

    // press the sign-out button
    fireEvent.press(screen.getByText("Sair"));

    // verify if user is in the sign-in screen
    expect(await screen.findByText("Bem-vindo"));
  });
});
