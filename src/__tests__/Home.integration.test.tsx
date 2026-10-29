import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

describe("integration: Home", () => {
  it("should display the city list and navigate to details when the city card is pressed", async () => {
    await renderApp({ isAuthenticated: true });

    await fireEvent.press(await screen.findByText("Rio de Janeiro"));

    expect(await screen.findByText("Pontos turísticos")).toBeOnTheScreen();

    await fireEvent.press(screen.getByTestId("Chevron-left"));

    // Dubai city card
    expect(await screen.findByText("Dubai")).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByTestId("search-input"), "barcelona");

    await waitForElementToBeRemoved(() => screen.getByText("Dubai"));

    expect(await screen.findByText("Barcelona")).toBeOnTheScreen();
    expect(screen.getByText("Espanha")).toBeOnTheScreen();
  });

  it("should mark the category pill as selected when filtering by it", async () => {
    await renderApp({ isAuthenticated: true });

    const beachPill = await screen.findByTestId("category-pill-beach");
    expect(beachPill).not.toBeSelected();

    await fireEvent.press(beachPill);

    expect(screen.getByTestId("category-pill-beach")).toBeSelected();
  });

  it("should display an error message when city list does not load", async () => {
    await renderApp({
      isAuthenticated: true,
      repositories: {
        city: {
          findAll: async () => {
            return Promise.reject(new Error("server is down!"));
          },
        },
      },
    });

    expect(
      await screen.findByText(/erro ao carregar cidades/i),
    ).toBeOnTheScreen();
    expect(await screen.findByText(/server is down!/i)).toBeOnTheScreen();
  });

  it("should display an empty message when city list is empty", async () => {
    await renderApp({
      isAuthenticated: true,
      repositories: {
        city: {
          findAll: async () => {
            return [];
          },
        },
      },
    });

    expect(await screen.findByText(/carregando cidades/i)).toBeOnTheScreen();
    expect(
      await screen.findByText(/não há cidades no momento/i),
    ).toBeOnTheScreen();
  });

  it("should revert the favorite star when favoriting fails", async () => {
    let rejectToggle: (error: Error) => void = () => {};
    await renderApp({
      isAuthenticated: true,
      repositories: {
        city: {
          toggleFavorite: () =>
            new Promise((_, reject) => {
              rejectToggle = reject;
            }),
        },
      },
    });

    const favoriteButton = await screen.findByTestId(
      "favorite-button-rio-de-janeiro",
    );
    await fireEvent.press(favoriteButton);

    expect(
      await within(favoriteButton).findByTestId("Favorite-fill"),
    ).toBeOnTheScreen();

    rejectToggle(new Error("server is down!"));

    expect(
      await within(favoriteButton).findByTestId("Favorite-outline"),
    ).toBeOnTheScreen();
  });
});
