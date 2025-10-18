import RepoCardSkeleton from "./RepoCardSkeleton";

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

const SkeletonGrid = ({ count = 8, className = "" }: SkeletonGridProps) => {
  return (
    <div
      id="repo-grid-skeleton"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
    >
      {Array.from({ length: count }, (_, idx) => (
        <RepoCardSkeleton key={`skeleton-${idx}`} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
