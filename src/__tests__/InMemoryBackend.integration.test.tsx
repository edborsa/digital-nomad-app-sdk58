import { fireEvent, screen } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";
import { signIn } from "../test-utils/signIn";

// The seeded user the Maestro flows sign in with
const seededUser = { email: "contato@coffstack.com", password: "a123456b" };

describe("integration: in-memory backend", () => {
  test("the seeded user can sign in", async () => {
    await renderApp();

    await signIn(seededUser.email, seededUser.password);

    expect(
      await screen.findByText(`signed in: ${seededUser.email}`),
    ).toBeOnTheScreen();
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
  });

  test("the profile shows the user who signed in", async () => {
    await renderApp();

    await signIn(seededUser.email, seededUser.password);
    await fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByText("Contato Coffstack")).toBeOnTheScreen();
    expect(screen.getByText(seededUser.email)).toBeOnTheScreen();
  });

  test("an edited name shows on the profile", async () => {
    await renderApp();

    await signIn(seededUser.email, seededUser.password);
    await fireEvent.press(await screen.findByText("Perfil"));
    await fireEvent.press(await screen.findByText(/editar perfil/i));

    await fireEvent.changeText(
      await screen.findByTestId("fullname-input"),
      "Maestro Name",
    );
    await fireEvent.press(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("perfil atualizado com sucesso"),
    ).toBeOnTheScreen();
    expect(await screen.findByText("Maestro Name")).toBeOnTheScreen();
  });

  test("a city favorited on the home screen shows on the profile", async () => {
    await renderApp();

    await signIn(seededUser.email, seededUser.password);
    await fireEvent.press(
      await screen.findByTestId("favorite-button-rio-de-janeiro"),
    );
    await fireEvent.press(screen.getByText("Perfil"));

    expect(
      await screen.findByTestId("favorite-city-card-rio-de-janeiro"),
    ).toBeOnTheScreen();
  });
});
