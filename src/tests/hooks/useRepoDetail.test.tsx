import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRepoDetail } from "../../hooks/useRepoDetail";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { afterEach, describe, expect, it } from "vitest";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

describe("useRepoDetail", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it("fetches repo and languages successfully", async () => {
    // 👈 'waitFor' is now imported, so remove it from the destructuring
    const { result } = renderHook(() => useRepoDetail("godaddy", "gdapi-php"), {
      wrapper,
    });

    await waitFor(() => !result.current.isRepoLoading); // 👈 Use the imported waitFor

    expect(result.current.repo?.name).toBe("gdapi-php");
    expect(result.current.languages).toEqual({
      JavaScript: 5000,
      TypeScript: 3000,
    });
    expect(result.current.repoError).toBeUndefined();
  });

  it("handles repo fetch error (404 Not Found)", async () => {
    server.use(
      http.get("https://api.github.com/repos/:owner/:name", () => {
        return new HttpResponse(null, { status: 404, statusText: "Not Found" });
      })
    );

    // 👈 'waitFor' is now imported, so remove it from the destructuring
    const { result } = renderHook(() => useRepoDetail("godaddy", "invalid"), {
      wrapper,
    });

    await waitFor(() => !result.current.isRepoLoading); // 👈 Use the imported waitFor

    expect(result.current.repo).toBeUndefined();
    expect(result.current.repoError).toBeDefined();
  });
});
