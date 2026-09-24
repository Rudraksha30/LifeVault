import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";

import "../../styles/userHeader.css";

function UserHeader() {
  const { user, logout } = useAuth();
  const { storage, getUsedStorageGB, recycleBinFiles } = useStorage();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // --------------------------------------------------
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // --------------------------------------------------

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // --------------------------------------------------
  // STORAGE
  // --------------------------------------------------

  const usedStorageGB = getUsedStorageGB();

  // --------------------------------------------------
  // SIGN OUT
  // --------------------------------------------------

  function handleSignOut() {
    setShowDropdown(false);
    logout();
  }

  return (
    <header className="border-bottom bg-white px-4 py-3">
      <div className="d-flex justify-content-between align-items-center">
        {/* WELCOME */}
        <div>
          <h1 className="h5 mb-1">Welcome back, {user?.name || "User"} 👋</h1>

          <p className="text-secondary mb-0">
            Here's a look at your LifeVault.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="d-flex align-items-center gap-3">
          {/* NOTIFICATIONS */}
          <button type="button" className="btn btn-light" title="Notifications">
            <i className="bi bi-bell"></i>
          </button>

          {/* USER DROPDOWN */}
          <div className="position-relative" ref={dropdownRef}>
            <button
              type="button"
              className="btn btn-light d-flex align-items-center"
              onClick={() => setShowDropdown((previous) => !previous)}
              aria-expanded={showDropdown}
              aria-haspopup="menu"
            >
              <i className="bi bi-person-circle me-2"></i>

              {user?.name || "User"}

              <i
                className={`bi ${
                  showDropdown ? "bi-chevron-up" : "bi-chevron-down"
                } ms-2 small`}
              ></i>
            </button>

            {/* DROPDOWN MENU */}
            {showDropdown && (
              <div className="user-header-dropdown" role="menu">
                {/* ACCOUNT HEADER */}
                <div className="user-dropdown-header">
                  <div className="d-flex align-items-center gap-3">
                    <div className="user-dropdown-avatar">
                      <i className="bi bi-person"></i>
                    </div>

                    <div className="min-width-0">
                      <div className="fw-semibold text-truncate">
                        {user?.name || "User"}
                      </div>

                      <small className="text-secondary d-block text-truncate">
                        {user?.email || "Personal Account"}
                      </small>
                    </div>
                  </div>
                </div>

                {/* ACCOUNT INFORMATION */}
                <div className="user-dropdown-info">
                  <div className="user-dropdown-info-item">
                    <div>
                      <i className="bi bi-cloud me-2"></i>
                      Storage
                    </div>

                    <span>
                      {usedStorageGB.toFixed(2)} / {storage.totalGB} GB
                    </span>
                  </div>

                  <div className="user-dropdown-info-item">
                    <div>
                      <i className="bi bi-trash3 me-2"></i>
                      Recycle Bin
                    </div>

                    <span>
                      {recycleBinFiles.length}{" "}
                      {recycleBinFiles.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                {/* LINKS */}
                <div className="user-dropdown-links">
                  <Link
                    to="/settings"
                    className="user-dropdown-link"
                    role="menuitem"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="bi bi-gear me-2"></i>
                    Account Settings
                  </Link>

                  <Link
                    to="/storage"
                    className="user-dropdown-link"
                    role="menuitem"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="bi bi-cloud-arrow-up me-2"></i>
                    Manage Storage
                  </Link>
                </div>

                {/* SIGN OUT */}
                <div className="user-dropdown-footer">
                  <button
                    type="button"
                    className="user-dropdown-link user-dropdown-signout"
                    onClick={handleSignOut}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
