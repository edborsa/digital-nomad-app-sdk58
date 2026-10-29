import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { colorScheme } from "nativewind";
import { renderApp } from "../test-utils/renderApp";
import { restartApp } from "../test-utils/restartApp";

describe("integration: Theme preference", () => {
  it("should follow the system theme until the learner picks one", async () => {
    await renderApp({ isAuthenticated: true });

    await fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByTestId("theme-option-system")).toBeSelected();
    expect(screen.getByTestId("theme-option-dark")).not.toBeSelected();
    expect(colorScheme.get()).toBe("light");
  });

  it("should apply the chosen dark theme and remember it after a restart", async () => {
    await renderApp({ isAuthenticated: true });
    await fireEvent.press(await screen.findByText("Perfil"));

    await fireEvent.press(await screen.findByTestId("theme-option-dark"));

    expect(screen.getByTestId("theme-option-dark")).toBeSelected();
    expect(screen.getByTestId("theme-option-system")).not.toBeSelected();
    expect(colorScheme.get()).toBe("dark");

    await restartApp();
    expect(colorScheme.get()).toBe("light");

    await renderApp({ isAuthenticated: true });
    await fireEvent.press(await screen.findByText("Perfil"));

    await waitFor(() =>
      expect(screen.getByTestId("theme-option-dark")).toBeSelected(),
    );
    expect(colorScheme.get()).toBe("dark");
  });
});
