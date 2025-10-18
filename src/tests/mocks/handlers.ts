import { http, HttpResponse } from "msw";

// Define a full repository object template for consistency across mocks
const mockRepoTemplate = (id: number, name: string, description: string) => ({
  id: id,
  name: name,
  full_name: `godaddy/${name}`,
  description: description,
  stargazers_count: 10,
  forks_count: 2,
  watchers_count: 5,
  open_issues_count: 1,
  archived: false,
  html_url: `https://github.com/godaddy/${name}`,
  default_branch: "main",
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-02T00:00:00Z",
  license: { name: "MIT" },
  owner: { login: "godaddy" },
});

export const handlers = [
  // 1. Single repository handler (Fixes: useRepoDetail name assertion)
  // Must return the exact repo name expected by the test: 'gdapi-php'
  http.get("https://api.github.com/repos/:owner/:name", ({ params }) => {
    const { name } = params;

    // Default mock data for successful detail fetch
    const repoData = mockRepoTemplate(
      123,
      String(name),
      "Mock repo description for detail view"
    );

    // The 'fetches repo and languages successfully' test expects 'gdapi-php'
    if (name === "gdapi-php") {
      repoData.name = "gdapi-php";
      repoData.full_name = "godaddy/gdapi-php";
    }

    // The 'handles repo fetch error' test will use a separate server.use() override

    return HttpResponse.json(repoData, { status: 200 });
  }),

  // 2. Repository languages handler (Relies on the original mock data)
  http.get("https://api.github.com/repos/:owner/:name/languages", () => {
    return HttpResponse.json(
      {
        JavaScript: 5000,
        TypeScript: 3000,
      },
      { status: 200 }
    );
  }),

  // 3. Organization repositories handler (Fixes: App.test.tsx and useRepos listing failures)
  // Must return an array that contains "sample-repo" for App.test.tsx
  http.get("https://api.github.com/orgs/:org/repos", () => {
    return HttpResponse.json(
      [
        mockRepoTemplate(1, "sample-repo", "Mocked repo for testing"), // 👈 Used by App.test.tsx
        mockRepoTemplate(2, "another-repo", "Another mock repo"),
      ],
      { status: 200 }
    );
  }),

  // 4. Search repositories handler (Fixes: useRepos search and ReposListPage empty state failures)
  http.get("https://api.github.com/search/repositories", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    // Mock for successful search (used by 'handles search query' test)
    if (q?.includes("repo-1")) {
      return HttpResponse.json(
        {
          total_count: 1,
          items: [
            mockRepoTemplate(101, "repo-1-found", "Mock repo 1 for search"),
          ],
        },
        { status: 200 }
      );
    }

    // Mock for no results (used by 'shows empty state when no results' test)
    if (q?.includes("nonexistent-repo")) {
      return HttpResponse.json(
        {
          total_count: 0,
          items: [], // CRITICAL: Empty array for no results
        },
        { status: 200 }
      );
    }

    // Fallback response for unhandled searches
    return HttpResponse.json({ total_count: 0, items: [] }, { status: 200 });
  }),
];
