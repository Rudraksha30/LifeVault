import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserSidebar() {
  const menuItems = [
    { to: "/dashboard", icon: "bi-grid", label: "Dashboard" },
    { to: "/timeline", icon: "bi-clock-history", label: "Timeline" },
    { to: "/chapters", icon: "bi-book", label: "Chapters" },
    { to: "/achievements", icon: "bi-trophy", label: "Achievements" },
    { to: "/goals", icon: "bi-bullseye", label: "Goals" },
    { to: "/documents", icon: "bi-file-earmark-text", label: "Documents" },
    { to: "/storage", icon: "bi-cloud", label: "Storage" },
    { to: "/ai", icon: "bi-stars", label: "LifeVault AI" },
    { to: "/settings", icon: "bi-gear", label: "Settings" },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="lifevault-user-sidebar d-flex flex-column p-3 border-end bg-light vh-100">
      <div className="mb-4">
        <NavLink
          to="/dashboard"
          className="text-decoration-none text-dark fw-bold fs-4"
        >
          <i className="bi bi-safe2 me-2"></i>
          LifeVault
        </NavLink>
      </div>

      <nav className="nav nav-pills flex-column gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-dark"
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
          className="btn btn-outline-danger w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default UserSidebar;