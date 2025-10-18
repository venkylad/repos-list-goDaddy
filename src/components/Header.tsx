import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  to?: string;
}

interface HeaderProps {
  breadcrumbs: Breadcrumb[];
}

const Header = ({ breadcrumbs }: HeaderProps) => {
  return (
    <header className="bg-bg border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Brand Title */}
        <h1 className="text-primary text-2xl font-bold mb-2">GoDaddy Repos</h1>

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;

              return (
                <li key={idx} className="flex items-center gap-2">
                  {crumb.to && !isLast ? (
                    <Link
                      to={crumb.to}
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast ? "text-primary font-medium" : "text-secondary"
                      }
                    >
                      {crumb.label}
                    </span>
                  )}

                  {!isLast && <ChevronRight size={16} className="text-muted" />}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
};

export default Header;
