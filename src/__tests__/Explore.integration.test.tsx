import { fireEvent, screen, within } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

describe("integration: Explore", () => {
  it("should show each category once, with every city in it", async () => {
    const consoleError = jest.spyOn(console, "error");
    await renderApp({ initialSession: "signedIn" });

    await fireEvent.press(await screen.findByText("Explorar"));

    // Several cities are urban; the category still heads the list only once
    expect(await screen.findAllByText("Explore a vida na cidade")).toHaveLength(
      1,
    );
    // Bali's first category is Destaques, but it also belongs to Praia
    const beach = screen.getByTestId("category-group-beach");
    expect(within(beach).getByText("Bali")).toBeOnTheScreen();
    expect(within(beach).getByText("Rio de Janeiro")).toBeOnTheScreen();

    // React reports repeated list keys as an error; Explore must not cause one
    const duplicateKeyErrors = consoleError.mock.calls.filter((args) =>
      args.some((arg) => String(arg).includes("same key")),
    );
    expect(duplicateKeyErrors).toEqual([]);
    consoleError.mockRestore();
  });
});
