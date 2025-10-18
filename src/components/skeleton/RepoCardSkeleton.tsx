import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RepoCardSkeleton = () => {
  return (
    <div
      id="repo-card-skeleton"
      className="bg-bg border border-slate-200 rounded-lg p-4 h-full flex flex-col gap-3 animate-pulse"
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-2">
        <Skeleton width="70%" height={24} />
        <Skeleton width={60} height={20} borderRadius={6} />
      </div>

      {/* Description */}
      <div className="flex-grow">
        <Skeleton count={3} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Skeleton circle width={16} height={16} />
              <div className="flex items-center gap-1">
                <Skeleton width={20} height={16} />
                <Skeleton width={40} height={12} />
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
        <Skeleton width={100} height={12} />
        <Skeleton width={80} height={16} />
      </div>
    </div>
  );
};

export default RepoCardSkeleton;
