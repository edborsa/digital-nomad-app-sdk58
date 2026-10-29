import { fireEvent, screen } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

describe("integration: Explore", () => {
  it("should show cities grouped under their category", async () => {
    await renderApp({ initialSession: "signedIn" });

    await fireEvent.press(await screen.findByText("Explorar"));

    // Rio de Janeiro's first category is Praia
    expect(
      (await screen.findAllByText("Sombra e água fresca")).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Rio de Janeiro")).toBeOnTheScreen();
  });
});
