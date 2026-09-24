import { Outlet } from "react-router-dom";
import UserSidebar from "../components/layout/UserSiderbar";
import UserHeader from "../components/layout/UserHeader";

function UserLayout() {
  return (
    <div className="d-flex min-vh-100">
      <div className="d-none d-lg-block flex-shrink-0">
        <UserSidebar />
      </div>

      <div className="flex-grow-1">
        <UserHeader />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;