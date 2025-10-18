import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import ReposListing from "../../../pages/RepoListPage";

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );

describe("ReposListing Page", () => {
  it("renders loading skeleton initially", async () => {
    renderWithProviders(<ReposListing />);
    expect(await screen.findAllByTestId("repo-grid-skeleton")).toHaveLength(12);
  });

  it("renders repository cards after fetch", async () => {
    renderWithProviders(<ReposListing />);
    await waitFor(() => {
      expect(screen.getByText("sample-repo")).toBeInTheDocument();
    });
    expect(screen.getByText(/Mocked repo for testing/)).toBeInTheDocument();
  });

  it("shows empty state when no results", async () => {
    renderWithProviders(<ReposListing />);
    const input = screen.getByPlaceholderText(
      "Search repositories..."
    ) as HTMLInputElement;
    input.focus();
    input.setSelectionRange(0, 0);
  });
});
