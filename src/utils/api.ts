export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getLanguageColor = (language: string | null): string => {
  const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#ce422b",
    Ruby: "#cc342d",
    PHP: "#777bb4",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#239120",
    Swift: "#FA7343",
    Kotlin: "#7F52FF",
    Shell: "#89e051",
  };

  return languageColors[language || ""] || "#858585";
};
