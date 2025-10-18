import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { describe, expect, it } from "vitest"; // 👈 Ensure Vitest globals are explicitly imported

const renderApp = () =>
  render(
    // Always use a new QueryClient instance in tests to prevent state leakage
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );

describe("App Routing", () => {
  it("renders repos listing by default", async () => {
    renderApp();

    // The query 'findByText' waits for the element to appear.
    // Ensure your mock service worker (MSW) or API returns data containing 'sample-repo'.
    expect(await screen.findByText(/sample-repo/i)).toBeInTheDocument();
  });

  it("renders not found for unknown route", async () => {
    // Navigate to an unknown route BEFORE rendering the application
    window.history.pushState({}, "Test page", "/unknown");
    renderApp();

    // The text content should match what your NotFound component renders
    expect(screen.getByText(/error not found/i)).toBeInTheDocument();
  });
});
