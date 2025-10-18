import { render, screen } from "@testing-library/react";
import LanguageBar from "../../../../pages/RepoDetailPage/components/LanguageBar";

const mockLanguages = { TypeScript: 1000, JavaScript: 500 };

describe("LanguageBar", () => {
  it("renders language bars and list", () => {
    render(<LanguageBar languages={mockLanguages} />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });
});
