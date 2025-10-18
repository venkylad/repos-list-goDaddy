import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import ReposListing from "../../../pages/RepoListPage";
import { server } from "../../mocks/server"; // Import your server instance
import { http, HttpResponse } from "msw"; // Import MSW v2.x handlers

// Create a new QueryClient for each test for isolation
const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );

describe("ReposListing Page", () => {
  // Good practice: Reset handlers to clear temporary mocks after each test
  afterEach(() => server.resetHandlers());

  // Note: Your other tests rely on the default mocks in your handlers.ts

  // ... (Other tests omitted for brevity)

  it("shows empty state when no results", async () => {
    // 1. Set up a temporary mock handler for the search API
    //    to return an empty result for *any* query.
    server.use(
      http.get("https://api.github.com/search/repositories", () => {
        return HttpResponse.json(
          { total_count: 0, items: [] },
          { status: 200 }
        );
      })
    );

    renderWithProviders(<ReposListing />);

    // 2. Wait for the initial, successful fetch to complete and render the component
    //    (You need to wait for the listing to load before searching)
    await waitFor(() =>
      expect(screen.getByText("mock-repo-1")).toBeInTheDocument()
    );

    const input = screen.getByPlaceholderText(
      "Search repositories..."
    ) as HTMLInputElement;

    // 3. Use fireEvent.change to simulate typing, which triggers the search hook
    //    We don't need to manually set input.value before fireEvent.change
    fireEvent.change(input, { target: { value: "nonexistent-repo" } });

    // 4. Wait for the search query to complete and render the empty state message
    await waitFor(
      () => {
        // The empty state text should now appear
        expect(screen.getByText(/No repositories found/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
