import { http, HttpResponse } from "msw"; // Use 'http' instead of 'rest' and import 'HttpResponse'

export const handlers = [
  http.get("https://api.github.com/search/repositories", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q"); // 'repo-1+org:godaddy'

    // This mock needs to return the exact structure the hook expects for search results
    if (q?.includes("repo-1")) {
      return HttpResponse.json(
        {
          total_count: 1,
          items: [
            {
              id: 101,
              name: "repo-1-found", // Ensure this name matches the assertion logic
              full_name: "godaddy/repo-1-found",
              description: "Mock repo 1 for search",
            },
          ],
        },
        { status: 200 }
      );
    }

    // Default response for other searches
    return HttpResponse.json({ total_count: 0, items: [] }, { status: 200 });
  }),
  // Mock fetching a single repository
  http.get("https://api.github.com/repos/:owner/:name", ({ params }) => {
    // Handler uses a single destructured argument
    const { owner, name } = params; // Access parameters via 'params'

    // Use HttpResponse.json() and pass the status as a second argument
    return HttpResponse.json(
      {
        id: 123,
        name: String(name),
        full_name: `${owner}/${name}`,
        description: "Mocked repo description",
        stargazers_count: 10,
        forks_count: 2,
        watchers_count: 5,
        open_issues_count: 1,
        archived: false,
        html_url: `https://github.com/${owner}/${name}`,
        default_branch: "main",
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-02T00:00:00Z",
        license: { name: "MIT" },
        owner: { login: owner },
      },
      { status: 200 }
    );
  }),

  // Mock fetching languages
  http.get("https://api.github.com/repos/:owner/:name/languages", () => {
    // No arguments needed, so use empty parenthesis
    return HttpResponse.json(
      {
        JavaScript: 5000,
        TypeScript: 3000,
      },
      { status: 200 }
    );
  }),

  // Mock fetching organization repositories
  http.get("https://api.github.com/orgs/godaddy/repos", () => {
    // No arguments needed
    return HttpResponse.json(
      [
        {
          id: 1,
          name: "mock-repo-1",
          full_name: "godaddy/mock-repo-1",
          description: "Mock repo 1",
          stargazers_count: 12,
          forks_count: 3,
          watchers_count: 5,
          open_issues_count: 1,
          archived: false,
          html_url: "https://github.com/godaddy/mock-repo-1",
          default_branch: "main",
          created_at: "2025-01-01T00:00:00Z",
          updated_at: "2025-01-02T00:00:00Z",
          license: { name: "MIT" },
          owner: { login: "godaddy" },
          language: "JavaScript",
        },
      ],
      { status: 200 }
    );
  }),
];
