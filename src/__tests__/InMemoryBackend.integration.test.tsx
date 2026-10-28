import { fireEvent, screen } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

// The seeded user the Maestro flows sign in with
const seededUser = { email: "contato@coffstack.com", password: "a123456b" };

async function signInAsSeededUser() {
  expect(await screen.findByText("Bem-vindo"));

  fireEvent.changeText(
    screen.getByPlaceholderText("seu email"),
    seededUser.email,
  );
  fireEvent.changeText(
    screen.getByPlaceholderText("digite sua senha"),
    seededUser.password,
  );
  fireEvent.press(screen.getByText(/entrar/i));
}

describe("integration: in-memory backend", () => {
  test("the seeded user can sign in", async () => {
    renderApp();

    await signInAsSeededUser();

    expect(
      await screen.findByText(`signed in: ${seededUser.email}`),
    ).toBeOnTheScreen();
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
  });

  test("the profile shows the user who signed in", async () => {
    renderApp();

    await signInAsSeededUser();
    fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByText("Contato Coffstack")).toBeOnTheScreen();
    expect(screen.getByText(seededUser.email)).toBeOnTheScreen();
  });

  test("an edited name shows on the profile", async () => {
    renderApp();

    await signInAsSeededUser();
    fireEvent.press(await screen.findByText("Perfil"));
    fireEvent.press(await screen.findByText(/editar perfil/i));

    fireEvent.changeText(
      await screen.findByTestId("fullname-input"),
      "Maestro Name",
    );
    fireEvent.press(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("perfil atualizado com sucesso"),
    ).toBeOnTheScreen();
    expect(await screen.findByText("Maestro Name")).toBeOnTheScreen();
  });
});
