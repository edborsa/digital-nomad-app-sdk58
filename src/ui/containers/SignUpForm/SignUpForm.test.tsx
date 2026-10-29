import { renderComponent } from "@/src/test-utils/renderComponent";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import theme from "../../theme/theme";
import { SignUpForm } from "./SignUpForm";

describe("<SignUpForm />", () => {
  it("should submit the form when all fields are filled in correctly", async () => {
    const onSubmitMock = jest.fn();
    await renderComponent(<SignUpForm onSubmit={onSubmitMock} />);

    await fireEvent.changeText(
      screen.getByTestId("fullname-input"),
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

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          fullname: "Lucas Garcez",
          email: "lucas@coffstack.com",
          password: "12345678",
        }),
        undefined, // React Hook Form onInvalid callback
      );
    });
  });

  describe("should NOT submit form", () => {
    it("when the password and confirm password do not match", async () => {
      const onSubmitMock = jest.fn();
      await renderComponent(<SignUpForm onSubmit={onSubmitMock} />);

      await fireEvent.changeText(
        screen.getByTestId("fullname-input"),
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
        "another-password",
      );

      await fireEvent.press(screen.getByTestId("submit-button"));

      expect(await screen.findByText("senhas devem ser iguais"));

      //style test
      expect(
        screen.getByTestId("confirm-password-input-container"),
      ).toHaveStyle({ borderColor: theme.colors.fbErrorSurface });

      expect(onSubmitMock).not.toHaveBeenCalled();
    });

    it("when the email is invalid", async () => {
      const onSubmitMock = jest.fn();
      await renderComponent(<SignUpForm onSubmit={onSubmitMock} />);

      await fireEvent.changeText(
        screen.getByTestId("fullname-input"),
        "Lucas Garcez",
      );

      await fireEvent.changeText(
        screen.getByTestId("email-input"),
        "invalid-email",
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

      expect(await screen.findByText("email inválido"));

      expect(onSubmitMock).not.toHaveBeenCalled();
    });
  });
});
