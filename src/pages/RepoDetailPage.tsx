import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const RepoDetailPage = () => {
  const { owner, name } = useParams();

  const {
    data: repo,
    isPending,
    error,
  } = useQuery({
    queryKey: ["repo", owner, name],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${name}`
      );
      if (!response.ok) throw new Error("Repo not found");
      return response.json();
    },
    enabled: !!owner && !!name, // Only fetch if params exist
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Repository not found</div>;

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      {/* ... rest of details */}
    </div>
  );
};
export default RepoDetailPage;
