import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import { ReactElement } from "react";
import { queryClientOptions } from "./queryClientOptions";

export const AllTheProviders = ({ children }: React.PropsWithChildren) => {
  const client = new QueryClient(queryClientOptions);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export const renderComponent = (
  component: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(component, { wrapper: AllTheProviders, ...options });
