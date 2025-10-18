import { Link, useParams } from "react-router-dom";
import { Star, GitFork, AlertCircle, Eye } from "lucide-react";
import RepoDetailPageSkeleton from "../../components/skeleton/RepoDetailPageSkeleton";
import RepoErrorState from "../../components/RepoErrorState";
import RepoHeader from "./components/RepoHeaderProps";
import StatCard from "./components/StatCard";
import LanguageBar from "./components/LanguageBar";
import RepoInfoGrid from "./components/RepoInfoGrid";
import { useRepoDetail } from "../../hooks/useRepoDetail";

const RepoDetailPage = () => {
  const { owner, name } = useParams();
  const { repo, isRepoLoading, repoError, languages } = useRepoDetail(
    owner,
    name
  );

  if (isRepoLoading) return <RepoDetailPageSkeleton />;
  if (repoError || !repo) return <RepoErrorState />;

  const stats = [
    {
      icon: Star,
      label: "Stars",
      value: repo.stargazers_count,
      iconColor: "text-warning",
      fillIcon: true,
    },
    {
      icon: GitFork,
      label: "Forks",
      value: repo.forks_count,
      iconColor: "text-primary",
    },
    {
      icon: AlertCircle,
      label: "Open Issues",
      value: repo.open_issues_count,
      iconColor: "text-danger",
    },
    {
      icon: Eye,
      label: "Watchers",
      value: repo.watchers_count,
      iconColor: "text-success",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <RepoHeader
        name={repo.name}
        description={repo.description}
        htmlUrl={repo.html_url}
        archived={repo.archived}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Languages */}
      {languages && Object.keys(languages).length > 0 && (
        <LanguageBar languages={languages} />
      )}

      <RepoInfoGrid
        createdAt={repo.created_at}
        updatedAt={repo.updated_at}
        license={repo.license}
        defaultBranch={repo.default_branch}
      />

      <div className="pt-4">
        <Link
          to="/repos"
          className="inline-flex text-sm items-center gap-2 text-primary hover:underline font-medium"
        >
          ← Back to Repositories
        </Link>
      </div>
    </div>
  );
};

export default RepoDetailPage;
