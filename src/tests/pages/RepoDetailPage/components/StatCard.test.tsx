import { render, screen } from "@testing-library/react";
import { Star } from "lucide-react";
import StatCard from "../../../../pages/RepoDetailPage/components/StatCard";

describe("StatCard", () => {
  it("renders stat label and formatted value", () => {
    render(<StatCard icon={Star} label="Stars" value={1000} />);
    expect(screen.getByText("Stars")).toBeInTheDocument();
    // Assuming StatCard formats 1000 to "1k"
    expect(screen.getByText("1k")).toBeInTheDocument();
  });
});
