import { useInfiniteQuery } from "@tanstack/react-query";
import type { Repository } from "../types";

const REPOS_PER_PAGE = 24;

interface UseReposOptions {
  searchQuery?: string;
}

export const useRepos = ({ searchQuery }: UseReposOptions = {}) => {
  return useInfiniteQuery<Repository[], Error>({
    queryKey: ["repos", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      let url: string;

      if (searchQuery && searchQuery.trim()) {
        // Use GitHub search API for queries
        url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
          searchQuery
        )}+org:godaddy&page=${pageParam}&per_page=${REPOS_PER_PAGE}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to search repositories");
        }
        const data = await response.json();
        return data.items; // Search API returns { items: [], total_count: number }
      } else {
        // Use org repos API for listing all
        url = `https://api.github.com/orgs/godaddy/repos?page=${pageParam}&per_page=${REPOS_PER_PAGE}&sort=updated`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return response.json();
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === REPOS_PER_PAGE
        ? allPages.length + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
