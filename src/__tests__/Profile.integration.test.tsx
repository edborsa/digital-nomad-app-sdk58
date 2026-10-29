import { fireEvent, screen } from "@testing-library/react-native";
import { AuthUser } from "../domain/auth/AuthUser";
import { renderApp } from "../test-utils/renderApp";

const mockedAuthUser: AuthUser = {
  id: "1",
  email: "lucas@coffstack.com",
  fullname: "Lucas Garcez",
  createdAt: "2025-06-23T10:32:55.10671Z",
};

describe("integration: Profile", () => {
  it("should update the profile info", async () => {
    await renderApp({
      initialSession: "signedIn",
      repositories: {
        auth: {
          getUser: () => mockedAuthUser,
        },
      },
    });

    await fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByText(/Informações da Conta/i)).toBeOnTheScreen();

    expect(await screen.findByText("Lucas Garcez")).toBeOnTheScreen();
    expect(await screen.findByText("lucas@coffstack.com")).toBeOnTheScreen();
    expect(await screen.findByText("junho 2025")).toBeOnTheScreen();

    await fireEvent.press(screen.getByText(/editar perfil/i));
    expect(await screen.findByText(/Atualizar Perfil/i)).toBeOnTheScreen();

    await fireEvent.changeText(
      screen.getByTestId("fullname-input"),
      "Lucas Coffstack",
    );

    await fireEvent.press(screen.getByTestId("submit-button"));

    // verify toast message
    expect(
      await screen.findByText("perfil atualizado com sucesso"),
    ).toBeOnTheScreen();

    expect(await screen.findByText(/Informações da Conta/i)).toBeOnTheScreen();
  });

  it("should update the password and return to the profile", async () => {
    await renderApp({
      initialSession: "signedIn",
      repositories: {
        auth: {
          getUser: () => mockedAuthUser,
        },
      },
    });

    await fireEvent.press(await screen.findByText("Perfil"));
    await fireEvent.press(await screen.findByText(/alterar senha/i));
    expect(await screen.findByText("Atualizar Senha")).toBeOnTheScreen();

    await fireEvent.changeText(
      screen.getByTestId("current-password-input"),
      "12345678",
    );
    await fireEvent.changeText(
      screen.getByTestId("new-password-input"),
      "87654321",
    );
    await fireEvent.changeText(
      screen.getByTestId("confirm-new-password-input"),
      "87654321",
    );
    await fireEvent.press(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("senha atualizada com sucesso"),
    ).toBeOnTheScreen();
    expect(await screen.findByText(/Informações da Conta/i)).toBeOnTheScreen();
    expect(screen.queryByText("Atualizar Senha")).not.toBeOnTheScreen();
  });

  it("should show an error and stay on the form when updating the profile fails", async () => {
    await renderApp({
      initialSession: "signedIn",
      repositories: {
        auth: {
          getUser: () => mockedAuthUser,
          updateProfile: () => Promise.reject(new Error("server is down!")),
        },
      },
    });

    await fireEvent.press(await screen.findByText("Perfil"));
    await fireEvent.press(await screen.findByText(/editar perfil/i));
    await fireEvent.changeText(
      await screen.findByTestId("fullname-input"),
      "Lucas Coffstack",
    );
    await fireEvent.press(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("erro ao atualizar perfil"),
    ).toBeOnTheScreen();
    expect(screen.getByTestId("fullname-input")).toBeOnTheScreen();
  });

  it("should show an error and stay on the form when updating the password fails", async () => {
    await renderApp({
      initialSession: "signedIn",
      repositories: {
        auth: {
          getUser: () => mockedAuthUser,
          updatePassword: () => Promise.reject(new Error("wrong password")),
        },
      },
    });

    await fireEvent.press(await screen.findByText("Perfil"));
    await fireEvent.press(await screen.findByText(/alterar senha/i));
    await fireEvent.changeText(
      await screen.findByTestId("current-password-input"),
      "12345678",
    );
    await fireEvent.changeText(
      screen.getByTestId("new-password-input"),
      "87654321",
    );
    await fireEvent.changeText(
      screen.getByTestId("confirm-new-password-input"),
      "87654321",
    );
    await fireEvent.press(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("erro ao atualizar senha"),
    ).toBeOnTheScreen();
    expect(screen.getByText("Atualizar Senha")).toBeOnTheScreen();
  });
});
