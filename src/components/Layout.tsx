import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  const { owner, name } = useParams();

  const getBreadcrumbs = () => {
    if (location.pathname === "/repos") {
      return [{ label: "Repositories" }];
    }

    if (owner && name) {
      return [
        { label: "Repositories", to: "/repos" },
        { label: name }, // Clean breadcrumb!
      ];
    }

    return [{ label: "Home" }];
  };

  return (
    <>
      <Header breadcrumbs={getBreadcrumbs()} />
      <main className="max-w-7xl mx-auto px-2">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
