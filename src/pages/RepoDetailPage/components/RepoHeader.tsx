import { Archive, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface RepoHeaderProps {
  name: string;
  description: string | null;
  htmlUrl: string;
  archived: boolean;
}

const RepoHeader = ({
  name,
  description,
  htmlUrl,
  archived,
}: RepoHeaderProps) => {
  return (
    <div className="bg-bg border border-border rounded-lg p-6">
      {/* Title and Status */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-primary mb-2 break-words">
            {name}
          </h1>
          {description && (
            <p className="text-secondary text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {archived && (
          <div className="flex items-center gap-2 px-3 py-1 bg-warning/10 border border-warning rounded-md flex-shrink-0">
            <Archive size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Archived</span>
          </div>
        )}
      </div>

      <Link
        to={htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
      >
        View on GitHub
        <ExternalLink size={16} />
      </Link>
    </div>
  );
};

export default RepoHeader;
