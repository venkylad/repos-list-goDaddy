import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRepos } from "../../hooks/useRepos";
import { describe, expect, it } from "vitest";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("useRepos", () => {
  it("fetches first page of repos", async () => {
    const { result } = renderHook(() => useRepos(), { wrapper });

    await waitFor(() => !result.current.isPending, { timeout: 3000 });

    expect(result.current.data?.pages[0].length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it("fetches next page correctly", async () => {
    const { result } = renderHook(() => useRepos(), { wrapper });

    await waitFor(() => !result.current.isPending, { timeout: 3000 });
    if (result.current.hasNextPage) {
      await result.current.fetchNextPage();

      await waitFor(() => !result.current.isFetchingNextPage, {
        timeout: 3000,
      });

      expect(result.current.data?.pages.length).toBeGreaterThan(1);
    }
  });

  it("handles search query", async () => {
    const { result } = renderHook(() => useRepos({ searchQuery: "repo-1" }), {
      wrapper,
    });

    await waitFor(() => !result.current.isPending, { timeout: 3000 });

    expect(result.current.data?.pages[0][0].name).toContain("repo-1");
  });
});
