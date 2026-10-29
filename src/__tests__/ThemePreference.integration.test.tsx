import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { Appearance } from "react-native";
import { renderApp } from "../test-utils/renderApp";
import { restartApp } from "../test-utils/restartApp";

// Appearance is the boundary to the device: Jest has no native appearance to read
// back, so these tests check what the app asks the device for
function setUpAppearance() {
  const setColorScheme = jest.spyOn(Appearance, "setColorScheme");
  return { lastRequested: () => setColorScheme.mock.lastCall?.[0] };
}

describe("integration: Theme preference", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should follow the system theme until the learner picks one", async () => {
    const appearance = setUpAppearance();
    await renderApp({ initialSession: "signedIn" });

    await fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByTestId("theme-option-system")).toBeSelected();
    expect(screen.getByTestId("theme-option-dark")).not.toBeSelected();
    expect(appearance.lastRequested()).toBe("unspecified");
  });

  it("should apply the chosen dark theme and remember it after a restart", async () => {
    const appearance = setUpAppearance();
    await renderApp({ initialSession: "signedIn" });
    await fireEvent.press(await screen.findByText("Perfil"));

    await fireEvent.press(await screen.findByTestId("theme-option-dark"));

    expect(screen.getByTestId("theme-option-dark")).toBeSelected();
    expect(screen.getByTestId("theme-option-system")).not.toBeSelected();
    expect(appearance.lastRequested()).toBe("dark");

    await restartApp();
    expect(appearance.lastRequested()).toBe("unspecified");

    await renderApp({ initialSession: "signedIn" });
    await fireEvent.press(await screen.findByText("Perfil"));

    await waitFor(() =>
      expect(screen.getByTestId("theme-option-dark")).toBeSelected(),
    );
    expect(appearance.lastRequested()).toBe("dark");
  });
});
