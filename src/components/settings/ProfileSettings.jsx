import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "Demo User");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // SAVE PROFILE
  // --------------------------------------------------

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Full name is required.");

      return;
    }

    const result = updateProfile({
      name: trimmedName,
    });

    if (!result.success) {
      setError(result.message || "Unable to update your profile.");

      return;
    }

    // Keep the input synchronized
    // with the saved value.
    setName(result.user.name);

    setMessage("Profile changes saved successfully.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* FULL NAME */}

        <div className="col-md-6">
          <label htmlFor="settingsName" className="form-label">
            Full Name
          </label>

          <input
            id="settingsName"
            type="text"
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        {/* EMAIL */}

        <div className="col-md-6">
          <label htmlFor="settingsEmail" className="form-label">
            Email Address
          </label>

          <div className="input-group">
            <input
              id="settingsEmail"
              type="email"
              className="form-control"
              value={user?.email || ""}
              readOnly
              aria-describedby="emailHelp"
            />

            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
          </div>

          <div id="emailHelp" className="form-text">
            Email address cannot be changed.
          </div>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="alert alert-danger mt-3 mb-0">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {message && (
        <div className="alert alert-success mt-3 mb-0">
          <i className="bi bi-check-circle me-2"></i>
          {message}
        </div>
      )}

      {/* SAVE */}

      <button type="submit" className="btn btn-dark mt-3">
        <i className="bi bi-check2 me-2"></i>
        Save Changes
      </button>
    </form>
  );
}

export default ProfileSettings;
