import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { describe, expect, it } from "vitest";
const renderApp = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );

describe("App Routing", () => {
  it("renders repos listing by default", async () => {
    renderApp();

    expect(await screen.findByText(/sample-repo/i)).toBeInTheDocument();
  });

  it("renders not found for unknown route", async () => {
    window.history.pushState({}, "Test page", "/unknown");
    renderApp();

    expect(screen.getByText(/error not found/i)).toBeInTheDocument();
  });
});
