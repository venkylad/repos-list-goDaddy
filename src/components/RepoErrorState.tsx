import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const RepoErrorState = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-danger/10 border border-danger rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto mb-2 text-danger" size={48} />
        <h2 className="text-xl font-semibold text-danger mb-2">
          Repository Not Found
        </h2>
        <p className="text-secondary mb-4">
          The repository you're looking for doesn't exist or is private.
        </p>
        <Link
          to="/repos"
          className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition"
        >
          Back to Repositories
        </Link>
      </div>
    </div>
  );
};

export default RepoErrorState;
