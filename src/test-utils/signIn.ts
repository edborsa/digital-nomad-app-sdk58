import { fireEvent, screen } from "@testing-library/react-native";

// Fills in and submits the sign-in screen
export async function signIn(email: string, password: string) {
  expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();

  await fireEvent.changeText(screen.getByPlaceholderText("seu email"), email);
  await fireEvent.changeText(
    screen.getByPlaceholderText("digite sua senha"),
    password,
  );
  await fireEvent.press(screen.getByText(/entrar/i));
}
