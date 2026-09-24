import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar";

function PublicLayout() {
  return (
    <div className="min-vh-100">
      <PublicNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;