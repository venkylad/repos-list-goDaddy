import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import * as hooks from "../../../hooks/useRepoDetail";
import RepoDetailPage from "../../../pages/RepoDetailPage";

const mockRepo = {
  id: 1,
  name: "test-repo",
  owner: { login: "venkat" },
  description: "Mocked repo",
  html_url: "https://github.com/venkat/test-repo",
  stargazers_count: 10,
  forks_count: 5,
  watchers_count: 2,
  open_issues_count: 1,
  archived: false,
  created_at: "2025-10-18T00:00:00Z",
  updated_at: "2025-10-18T12:00:00Z",
  default_branch: "main",
  license: { name: "MIT" },
};

const mockLanguages = {
  TypeScript: 1000,
  JavaScript: 500,
};

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={["/repos/venkat/test-repo"]}>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  );

describe("RepoDetailPage", () => {
  it("renders loading skeleton while fetching", () => {
    vi.spyOn(hooks, "useRepoDetail").mockReturnValue({
      repo: null,
      languages: null,
      isRepoLoading: true,
      repoError: null,
    } as any);

    renderWithProviders(<RepoDetailPage />);
    expect(screen.findAllByTestId("repo-detail-skeleton"));
  });

  it("renders error state if repo fails", () => {
    vi.spyOn(hooks, "useRepoDetail").mockReturnValue({
      repo: null,
      languages: null,
      isRepoLoading: false,
      repoError: new Error("Failed"),
    } as any);

    renderWithProviders(<RepoDetailPage />);
    expect(screen.getByText(/repository not found/i)).toBeInTheDocument();
  });

  it("renders repo details, stats, languages, and info grid", async () => {
    vi.spyOn(hooks, "useRepoDetail").mockReturnValue({
      repo: mockRepo,
      languages: mockLanguages,
      isRepoLoading: false,
      repoError: null,
    } as any);

    renderWithProviders(<RepoDetailPage />);

    expect(await screen.findByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("Mocked repo")).toBeInTheDocument();
    expect(screen.getByText("Stars")).toBeInTheDocument();
    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("MIT")).toBeInTheDocument();
  });
});
