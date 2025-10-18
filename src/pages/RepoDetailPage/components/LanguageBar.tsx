import { Code } from "lucide-react";
import type { Languages } from "../../../types";
import { getLanguageColor } from "../../../utils/api";

interface LanguageBarProps {
  languages: Languages;
}

interface LanguageData {
  name: string;
  percentage: string;
  bytes: number;
}

const LanguageBar = ({ languages }: LanguageBarProps) => {
  // Calculate language percentages
  const languageEntries = Object.entries(languages);
  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0);

  const languagePercentages: LanguageData[] = languageEntries
    .map(([lang, bytes]) => ({
      name: lang,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
      bytes,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  if (languagePercentages.length === 0) return null;

  return (
    <div className="bg-bg border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Code size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-primary">Languages</h2>
      </div>

      {/* Language Bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-4">
        {languagePercentages.map(({ name, percentage }, idx) => (
          <div
            key={name}
            className="transition-all hover:opacity-80"
            style={{
              width: `${percentage}%`,
              backgroundColor: getLanguageColor(name, idx),
            }}
            title={`${name}: ${percentage}%`}
          />
        ))}
      </div>

      {/* Language List */}
      <div className="space-y-2">
        {languagePercentages.map(({ name, percentage }, idx) => (
          <div key={name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: getLanguageColor(name, idx) }}
              />
              <span className="text-sm font-medium text-secondary">{name}</span>
            </div>
            <span className="text-sm text-muted">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageBar;
