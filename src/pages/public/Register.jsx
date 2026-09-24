import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFieldErrors((previous) => {
      const updatedErrors = { ...previous };
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  function validateForm() {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Full name is required.";
    else if (formData.name.trim().length < 2) {
      errors.name = "Full name must contain at least 2 characters.";
    }
    else if (!/^[a-zA-Z ]+$/.test(formData.name.trim())) {
      errors.name = "Full name can contain letters and spaces only.";
    }

    if (!formData.username.trim()) errors.username = "Username is required.";
    else if (formData.username.trim().length < 3) {
      errors.username = "Username must contain at least 3 characters.";
    }

    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (formData.username.trim() && !usernamePattern.test(formData.username.trim())) {
      errors.username = "Username can contain only letters, numbers and underscores.";
    }

    if (!formData.email.trim()) errors.email = "Email is required.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    const phonePattern = /^[6-9][0-9]{9}$/;
    if (formData.phone.trim() && !phonePattern.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.password) errors.password = "Password is required.";
    else if (formData.password.length < 8) errors.password = "Password must contain at least 8 characters.";
    else if (!/[A-Z]/.test(formData.password)) errors.password = "Password must contain at least one uppercase letter.";
    else if (!/[a-z]/.test(formData.password)) errors.password = "Password must contain at least one lowercase letter.";
    else if (!/[0-9]/.test(formData.password)) errors.password = "Password must contain at least one number.";

    if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";

    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "Please agree before creating your account.";
    }

    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSuccess("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    const result = register({
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    });

    if (!result.success) {
      const errorField = result.message.toLowerCase().includes("email")
        ? "email"
        : "username";

      setFieldErrors({ [errorField]: result.message });
      return;
    }

    setSuccess("Account created successfully. Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i className="bi bi-safe2 fs-1"></i>

                <h1 className="h3 mt-3">Create Your LifeVault</h1>

                <p className="text-secondary">Start preserving your journey.</p>
              </div>

              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    className={`form-control ${fieldErrors.username ? "is-invalid" : ""}`}
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {fieldErrors.username && <div className="invalid-feedback">{fieldErrors.username}</div>}

                  <div className="form-text">
                    Letters, numbers and underscores only.
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                  />
                  {fieldErrors.phone && <div className="invalid-feedback">{fieldErrors.phone}</div>}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}

                  <div className="form-text">
                    Minimum 8 characters with uppercase, lowercase and number.
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`form-control ${fieldErrors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {fieldErrors.confirmPassword && <div className="invalid-feedback">{fieldErrors.confirmPassword}</div>}
                </div>

                <div className="form-check mb-4">
                  <input
                    id="agreedToTerms"
                    name="agreedToTerms"
                    type="checkbox"
                    className={`form-check-input ${fieldErrors.agreedToTerms ? "is-invalid" : ""}`}
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                  />

                  <label
                    htmlFor="agreedToTerms"
                    className="form-check-label"
                  >
                    I agree to the Terms and Conditions.
                  </label>
                  {fieldErrors.agreedToTerms && <div className="invalid-feedback">{fieldErrors.agreedToTerms}</div>}
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Create Account
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
