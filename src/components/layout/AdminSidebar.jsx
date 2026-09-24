import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const menuItems = [
    { to: "/admin", icon: "bi-grid", label: "Dashboard", end: true },
    { to: "/admin/users", icon: "bi-people", label: "Users" },
    {
      to: "/admin/storage-packs",
      icon: "bi-cloud-plus",
      label: "Storage Packs",
    },
    {
      to: "/admin/payments",
      icon: "bi-credit-card",
      label: "Payments",
    },
    {
      to: "/admin/categories",
      icon: "bi-tags",
      label: "Categories",
    },
    {
      to: "/admin/reports",
      icon: "bi-flag",
      label: "Reports",
    },
    {
      to: "/admin/statistics",
      icon: "bi-bar-chart",
      label: "Statistics",
    },
    {
      to: "/admin/settings",
      icon: "bi-gear",
      label: "Settings",
    },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="lifevault-admin-sidebar d-flex flex-column p-3 border-end bg-dark text-white vh-100">
      <div className="mb-4">
        <NavLink
          to="/admin"
          className="text-decoration-none text-white fw-bold fs-4"
        >
          <i className="bi bi-shield-lock me-2"></i>
          LifeVault
        </NavLink>

        <small className="d-block text-secondary mt-1">
          Admin Panel
        </small>
      </div>

      <nav className="nav nav-pills flex-column gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"
              }`
            }
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          type="button"
          className="btn btn-outline-light w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;