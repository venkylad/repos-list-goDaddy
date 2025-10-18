import { Navigate, Route, Routes } from "react-router-dom";
import ReposListing from "./pages/ReposListing";
import RepoDetailPage from "./pages/RepoDetailPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/repos" replace />} />
        <Route path="/repos" element={<ReposListing />} />
        <Route path="/repos/:owner/:name" element={<RepoDetailPage />} />
      </Route>
      <Route path="*" element={<div>Error Not found</div>} />
    </Routes>
  );
}

export default App;
