import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RepoCard from "../../../../pages/RepoListPage/components/RepoCard";
import type { RepoSummary } from "../../../../types";

const mockRepo = {
  id: 1,
  name: "test-repo",
  owner: { login: "venkat" },
  description: "This is a test repo",
  language: "TypeScript",
  stargazers_count: 120,
  forks_count: 10,
  watchers_count: 5,
  open_issues_count: 3,
  updated_at: "2025-10-18T12:00:00Z",
  html_url: "https://github.com/venkat/test-repo",
};

describe("RepoCard", () => {
  it("renders repo name, description, and stats", () => {
    render(
      <BrowserRouter>
        <RepoCard repo={mockRepo as RepoSummary} />
      </BrowserRouter>
    );

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("This is a test repo")).toBeInTheDocument();
    expect(screen.getByText("Stars")).toBeInTheDocument();
    expect(screen.getByText("Forks")).toBeInTheDocument();
  });
});
