import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import ReposListing from "../../../pages/RepoListPage";
import { server } from "../../mocks/server"; // Import your server instance
import { http, HttpResponse } from "msw"; // Import MSW v2.x handlers

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );

describe("ReposListing Page", () => {
  afterEach(() => server.resetHandlers());

  it("shows empty state when no results", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", () => {
        return HttpResponse.json(
          { total_count: 0, items: [] },
          { status: 200 }
        );
      })
    );

    renderWithProviders(<ReposListing />);

    await waitFor(() =>
      expect(screen.getByText("mock-repo-1")).toBeInTheDocument()
    );

    const input = screen.getByPlaceholderText(
      "Search repositories..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "nonexistent-repo" } });

    await waitFor(
      () => {
        expect(screen.getByText(/No repositories found/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
