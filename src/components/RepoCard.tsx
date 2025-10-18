import { Link } from "react-router-dom";
import { Star, GitFork, AlertCircle, Eye, ExternalLink } from "lucide-react";
import { formatNumber, formatDate } from "../utils/api";
import type { RepoSummary } from "../types";

interface RepoCardProps {
  repo: RepoSummary;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <div className="h-full text-start bg-bg border border-slate-200 rounded-lg p-4 flex flex-col gap-3 hover:shadow-lg hover:border-primary transition-all duration-300">
      {/* Title - Internal Link */}
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/repos/${repo.owner.login}/${repo?.name}`}
          title={repo.name}
          className="group text-lg font-semibold text-primary/90 flex-1 truncate hover:text-primary transition-colors flex items-center gap-1"
        >
          <span className="truncate">{repo.name}</span>
          <ExternalLink
            size={16}
            className="hidden group-hover:inline-block flex-shrink-0"
          />
        </Link>
        {repo.language && (
          <div className="flex items-center bg-danger px-2 py-1 rounded text-xs font-semibold text-white flex-shrink-0">
            {repo.language}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-secondary line-clamp-3 leading-relaxed flex-grow">
        {repo.description || (
          <span className="italic text-muted">No description provided</span>
        )}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
        {[
          {
            icon: <Star size={16} className="text-warning" />,
            label: "Stars",
            value: repo.stargazers_count,
          },
          {
            icon: <GitFork size={16} className="text-primary" />,
            label: "Forks",
            value: repo.forks_count,
          },
          {
            icon: <AlertCircle size={16} className="text-danger" />,
            label: "Issues",
            value: repo.open_issues_count,
          },
          {
            icon: <Eye size={16} className="text-success" />,
            label: "Watchers",
            value: repo.watchers_count,
          },
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <div className="flex items-center gap-1">
              <div className="font-semibold text-primary/90">
                {formatNumber(value)}
              </div>
              <div className="text-xs text-secondary">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
        <span className="text-muted">
          Updated {formatDate(repo.updated_at)}
        </span>
        <Link
          to={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline"
        >
          View on GitHub →
        </Link>
      </div>
    </div>
  );
};

export default RepoCard;
