import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RepoHeader from "../../../../pages/RepoDetailPage/components/RepoHeader";

describe("RepoHeader", () => {
  it("renders repo name, description, and GitHub link", () => {
    render(
      <BrowserRouter>
        <RepoHeader
          name="test-repo"
          description="A test repo"
          htmlUrl="https://github.com/test"
          archived={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repo")).toBeInTheDocument();
    expect(screen.getByText(/archived/i)).toBeInTheDocument();
    expect(screen.getByText(/view on github/i)).toHaveAttribute(
      "href",
      "https://github.com/test"
    );
  });
});
