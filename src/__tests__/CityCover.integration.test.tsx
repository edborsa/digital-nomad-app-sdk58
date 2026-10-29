import { fireEvent, screen } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

// React Native warns once per module registry, so this lives in its own file
describe("integration: City cover", () => {
  it("should show the city list and city details without deprecation warnings", async () => {
    const warn = jest.spyOn(console, "warn");

    await renderApp({ isAuthenticated: true });

    await fireEvent.press(await screen.findByText("Rio de Janeiro"));
    expect(await screen.findByText("Pontos turísticos")).toBeOnTheScreen();

    expect(warn).not.toHaveBeenCalledWith(expect.stringMatching(/deprecated/i));
    warn.mockRestore();
  });
});
