import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RepoDetailPageSkeleton = () => {
  return (
    <div id="repo-page-skeleton" className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-bg border border-border rounded-lg p-6">
        <Skeleton width="50%" height={32} className="mb-2" />
        <Skeleton width="80%" height={20} count={2} />
        <div className="mt-4">
          <Skeleton width={150} height={24} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="bg-bg border border-border rounded-lg p-4 flex flex-col gap-2"
            >
              <Skeleton width={80} height={20} />
              <Skeleton width={40} height={28} />
            </div>
          ))}
      </div>

      {/* Languages Section */}
      <div className="bg-bg border border-border rounded-lg p-6">
        <Skeleton width={120} height={24} className="mb-4" />
        {/* Language Bar */}
        <Skeleton height={12} className="mb-4 rounded-full" />
        {/* Language List */}
        <div className="space-y-2">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton width={12} height={12} circle />
                  <Skeleton width={80} height={16} />
                </div>
                <Skeleton width={40} height={16} />
              </div>
            ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-bg border border-border rounded-lg p-6 space-y-4">
        <Skeleton width={160} height={24} />
        <div className="grid md:grid-cols-2 gap-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Skeleton width={20} height={20} />
                <div>
                  <Skeleton width={60} height={12} className="mb-1" />
                  <Skeleton width={100} height={16} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Back Button */}
      <Skeleton width={150} height={24} />
    </div>
  );
};

export default RepoDetailPageSkeleton;
