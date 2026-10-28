import { fireEvent, screen } from "@testing-library/react-native";

// Fills in and submits the sign-in screen
export async function signIn(email: string, password: string) {
  expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();

  fireEvent.changeText(screen.getByPlaceholderText("seu email"), email);
  fireEvent.changeText(
    screen.getByPlaceholderText("digite sua senha"),
    password,
  );
  fireEvent.press(screen.getByText(/entrar/i));
}
