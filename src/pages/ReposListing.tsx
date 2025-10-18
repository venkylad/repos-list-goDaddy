import { useQuery } from "@tanstack/react-query";
import RepoCard from "../components/RepoCard";
import RepoCardSkeleton from "../components/skeleton/RepoCardSkeleton";
import type { Repository } from "../types";

const ReposListing = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["reposListing"],
    queryFn: () =>
      fetch("https://api.github.com/orgs/godaddy/repos").then((res) =>
        res.json()
      ),
  });

  const skeletonCount = 8; // Number of skeleton cards to show

  return (
    <div className="grid grid-rows grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {isPending &&
        Array.from({ length: skeletonCount }).map((_, idx) => (
          <RepoCardSkeleton key={idx} />
        ))}

      {error && (
        <p className="col-span-full text-red-500">Failed to load repos</p>
      )}

      {data?.map((repo: Repository) => (
        <RepoCard
          key={repo.id}
          repo={{
            id: repo.id,
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            watchers_count: repo.watchers_count,
            updated_at: repo.updated_at,
            html_url: repo.html_url,
            open_issues_count: repo.open_issues_count,
            owner: repo.owner,
          }}
        />
      ))}
    </div>
  );
};

export default ReposListing;
