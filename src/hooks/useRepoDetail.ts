import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import type { Repository, Languages } from "../types";

export const useRepoDetail = (owner?: string, name?: string) => {
  const results = useQueries<
    [UseQueryResult<Repository>, UseQueryResult<Languages>]
  >({
    queries: [
      {
        queryKey: ["repo", owner, name],
        queryFn: async () => {
          const res = await fetch(
            `https://api.github.com/repos/${owner}/${name}`
          );
          if (!res.ok) throw new Error("Repository not found");
          return res.json();
        },
        enabled: !!owner && !!name,
      },
      {
        queryKey: ["languages", owner, name],
        queryFn: async () => {
          const res = await fetch(
            `https://api.github.com/repos/${owner}/${name}/languages`
          );
          if (!res.ok) throw new Error("Failed to fetch languages");
          return res.json();
        },
        enabled: !!owner && !!name,
      },
    ],
  });

  const [repoResult, langResult] = results;

  return {
    repo: repoResult.data,
    isRepoLoading: repoResult.isPending,
    repoError: repoResult.error,
    languages: langResult.data,
    isLangLoading: langResult.isPending,
  };
};
