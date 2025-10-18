import { useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRepos } from "../../hooks/useRepos";
import SearchBar from "./components/SearchBar";
import type { Repository } from "../../types";
import RepoCard from "./components/RepoCard";
import { useDebounce } from "../../hooks/useDebounce";
import SkeletonGrid from "../../components/skeleton/SkeletonGrid";

const INITIAL_SKELETON_COUNT = 12;
const LOADING_SKELETON_COUNT = 8;

const ReposListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, fetchNextPage, hasNextPage, isPending, error } = useRepos({
    searchQuery: debouncedSearch,
  });

  // Flatten all pages into single array
  const allRepos = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

  // Show loading skeleton when typing (before debounce triggers)
  const isSearching = searchQuery !== debouncedSearch;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header with Search */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search repositories..."
        />
      </div>

      {/* Loading State */}
      {(isPending || isSearching) && (
        <SkeletonGrid count={INITIAL_SKELETON_COUNT} />
      )}

      {/* Error State */}
      {error && !isPending && !isSearching && (
        <div className="text-center py-12">
          <p className="text-danger text-lg font-medium mb-2">
            Failed to load repositories
          </p>
          <p className="text-secondary text-sm">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      )}

      {/* Data State with Infinite Scroll */}
      {!isPending && !error && !isSearching && (
        <InfiniteScroll
          dataLength={allRepos.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <SkeletonGrid count={LOADING_SKELETON_COUNT} className="mt-4" />
          }
          endMessage={
            allRepos.length > 0 && (
              <p className="text-center text-secondary text-sm py-8">
                {debouncedSearch
                  ? "That's all we found! 🔍"
                  : "You've reached the end! 🎉"}
              </p>
            )
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allRepos.map((repo: Repository) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* Empty State */}
      {!isPending && !error && !isSearching && allRepos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary text-lg mb-2">
            {debouncedSearch
              ? `No repositories found for "${debouncedSearch}"`
              : "No repositories found"}
          </p>
          {debouncedSearch && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-primary hover:underline text-sm font-medium mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReposListing;
