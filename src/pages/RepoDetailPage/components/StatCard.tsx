import type { LucideIcon } from "lucide-react";
import { formatNumber } from "../../../utils/api";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  iconColor?: string;
  fillIcon?: boolean;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  iconColor = "text-primary",
  fillIcon = false,
}: StatCardProps) => {
  return (
    <div className="bg-bg border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className={iconColor}
          size={20}
          fill={fillIcon ? "currentColor" : "none"}
        />
        <span className="text-sm text-secondary">{label}</span>
      </div>
      <p className="text-xl font-bold text-primary">{`${formatNumber(
        1000
      )}`}</p>
    </div>
  );
};

export default StatCard;
