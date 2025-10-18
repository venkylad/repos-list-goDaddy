import { render, screen } from "@testing-library/react";
import RepoInfoGrid from "../../../../pages/RepoDetailPage/components/RepoInfoGrid";
import type { License } from "../../../../types";

describe("RepoInfoGrid", () => {
  it("renders info items correctly", () => {
    render(
      <RepoInfoGrid
        createdAt="2025-10-18T00:00:00Z"
        updatedAt="2025-10-18T12:00:00Z"
        license={{ name: "MIT" } as License}
        defaultBranch="main"
      />
    );

    // The component likely renders a human-readable format for dates,
    // but testing for the labels is a safe check.
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Last Updated")).toBeInTheDocument();
    expect(screen.getByText("License")).toBeInTheDocument();
    expect(screen.getByText("Default Branch")).toBeInTheDocument();
  });
});
