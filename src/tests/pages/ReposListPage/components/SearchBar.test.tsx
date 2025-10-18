import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "../../../../pages/RepoListPage/components/SearchBar";

describe("SearchBar", () => {
  it("renders input with placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.getByPlaceholderText("Search repositories...")
    ).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search repositories..."), {
      target: { value: "react" },
    });
    expect(handleChange).toHaveBeenCalledWith("react");
  });

  it("shows clear button when value exists", () => {
    render(<SearchBar value="react" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /clear search/i })).toBeVisible();
  });
});
