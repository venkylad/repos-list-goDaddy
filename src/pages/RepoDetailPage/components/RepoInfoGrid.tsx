import { Calendar, Users, Code } from "lucide-react";
import type { License } from "../../../types";
import { formatDate } from "../../../utils/api";

interface RepoInfoGridProps {
  createdAt: string;
  updatedAt: string;
  license: License | null;
  defaultBranch: string;
}

const RepoInfoGrid = ({
  createdAt,
  updatedAt,
  license,
  defaultBranch,
}: RepoInfoGridProps) => {
  return (
    <div className="bg-bg border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Repository Information
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <InfoItem
          icon={Calendar}
          label="Created"
          value={formatDate(createdAt)}
        />

        <InfoItem
          icon={Calendar}
          label="Last Updated"
          value={formatDate(updatedAt)}
        />

        {license && (
          <InfoItem icon={Users} label="License" value={license.name} />
        )}

        <InfoItem icon={Code} label="Default Branch" value={defaultBranch} />
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ComponentType<{ size: number; className: string }>;
  label: string;
  value: string;
}

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <Icon size={20} className="text-secondary flex-shrink-0" />
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="text-secondary font-medium text-sm">{value}</p>
      </div>
    </div>
  );
};

export default RepoInfoGrid;
