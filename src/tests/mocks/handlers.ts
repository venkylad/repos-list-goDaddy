import { http, HttpResponse } from "msw";

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
  http.get("https://api.github.com/repos/:owner/:name", ({ params }) => {
    const { name } = params;

    const repoData = mockRepoTemplate(
      123,
      String(name),
      "Mock repo description for detail view"
    );

    if (name === "gdapi-php") {
      repoData.name = "gdapi-php";
      repoData.full_name = "godaddy/gdapi-php";
    }

    return HttpResponse.json(repoData, { status: 200 });
  }),

  http.get("https://api.github.com/repos/:owner/:name/languages", () => {
    return HttpResponse.json(
      {
        JavaScript: 5000,
        TypeScript: 3000,
      },
      { status: 200 }
    );
  }),

  http.get("https://api.github.com/orgs/:org/repos", () => {
    return HttpResponse.json(
      [
        mockRepoTemplate(1, "sample-repo", "Mocked repo for testing"),
        mockRepoTemplate(2, "another-repo", "Another mock repo"),
      ],
      { status: 200 }
    );
  }),

  http.get("https://api.github.com/search/repositories", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

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
