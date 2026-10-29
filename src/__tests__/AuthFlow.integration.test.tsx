import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { issueFakeJwt } from "../infra/repositories/adapters/inMemory/fakeJwt";
import { renderApp } from "../test-utils/renderApp";
import { signIn } from "../test-utils/signIn";

describe("integration: Auth Flow", () => {
  test("the user can sign-in and sign-out", async () => {
    await renderApp();

    await signIn("lucas@coffstack.com", "12345678");

    // verify toast message
    expect(
      await screen.findByText("signed in: lucas@coffstack.com"),
    ).toBeOnTheScreen();

    // verify if home screen was rendered
    expect(await screen.findByText("Rio de Janeiro")).toBeOnTheScreen();
    expect(screen.getByText("Bangkok")).toBeOnTheScreen();

    // press the profile tab
    await fireEvent.press(screen.getByText("Perfil"));

    // press the sign-out button
    await fireEvent.press(screen.getByText("Sair"));

    // verify if user is in the sign-in screen
    expect(await screen.findByText("Bem-vindo"));
  });

  test("the sign-in button is busy and disabled while signing in", async () => {
    let resolveSignIn: () => void = () => {};
    await renderApp({
      repositories: {
        auth: {
          signIn: () =>
            new Promise((resolve) => {
              resolveSignIn = () => resolve(issueFakeJwt("1"));
            }),
        },
      },
    });

    await signIn("lucas@coffstack.com", "12345678");

    await waitFor(() =>
      expect(screen.getByTestId("sign-in-button")).toBeBusy(),
    );
    expect(screen.getByTestId("sign-in-button")).toBeDisabled();

    resolveSignIn();

    expect(
      await screen.findByText("signed in: lucas@coffstack.com"),
    ).toBeOnTheScreen();
  });

  test("a new user can sign up and returns to sign-in", async () => {
    await renderApp();

    await fireEvent.press(await screen.findByTestId("sign-up-link"));

    await fireEvent.changeText(
      await screen.findByTestId("fullname-input"),
      "Ana Lima",
    );
    await fireEvent.changeText(
      screen.getByTestId("email-input"),
      "ana@coffstack.com",
    );
    await fireEvent.changeText(
      screen.getByTestId("password-input"),
      "12345678",
    );
    await fireEvent.changeText(
      screen.getByTestId("confirm-password-input"),
      "12345678",
    );
    await fireEvent.press(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("cadastro feito com sucesso"),
    ).toBeOnTheScreen();
    expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();
    expect(screen.queryByTestId("fullname-input")).not.toBeOnTheScreen();
  });

  test("signing up with an email that is already in use shows an error", async () => {
    await renderApp();

    await fireEvent.press(await screen.findByTestId("sign-up-link"));
    await fireEvent.changeText(
      await screen.findByTestId("fullname-input"),
      "Lucas Garcez",
    );
    await fireEvent.changeText(
      screen.getByTestId("email-input"),
      "lucas@coffstack.com",
    );
    await fireEvent.changeText(
      screen.getByTestId("password-input"),
      "12345678",
    );
    await fireEvent.changeText(
      screen.getByTestId("confirm-password-input"),
      "12345678",
    );
    await fireEvent.press(screen.getByTestId("submit-button"));

    expect(await screen.findByText("erro ao cadastrar")).toBeOnTheScreen();
    expect(screen.getByTestId("fullname-input")).toBeOnTheScreen();
  });

  test("a learner can ask for a password reset email and returns to sign-in", async () => {
    const sendResetPasswordEmail = jest.fn(async () => {});
    await renderApp({ repositories: { auth: { sendResetPasswordEmail } } });

    await fireEvent.press(await screen.findByText("Esqueceu sua senha"));
    expect(await screen.findByText("Recuperar Senha")).toBeOnTheScreen();

    await fireEvent.changeText(
      screen.getByTestId("email-input"),
      "lucas@coffstack.com",
    );
    await fireEvent.press(screen.getByText("Enviar link"));

    expect(
      await screen.findByText("verifique sua caixa de e-mail"),
    ).toBeOnTheScreen();
    expect(sendResetPasswordEmail).toHaveBeenCalledWith("lucas@coffstack.com");
    expect(await screen.findByText("Bem-vindo")).toBeOnTheScreen();
  });
});
