import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminHeader from "../components/layout/AdminHeader";

function AdminLayout() {
  return (
    <div className="d-flex min-vh-100">
      <div className="d-none d-lg-block flex-shrink-0">
        <AdminSidebar />
      </div>

      <div className="flex-grow-1">
        <AdminHeader />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;