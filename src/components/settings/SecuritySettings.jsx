import { useState } from "react";

function SecuritySettings() {
    const [showPasswordForm, setShowPasswordForm] =
        useState(false);
    const [currentPassword, setCurrentPassword] =
        useState("");
    const [newPassword, setNewPassword] =
        useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [message, setMessage] =
        useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setMessage(
                "Please fill in all password fields."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage(
                "New passwords do not match."
            );
            return;
        }

        setMessage(
            "Password change is ready for backend integration."
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    return (
        <div>

            <div className="settings-security-row">

                <div>
                    <strong>
                        Password
                    </strong>

                    <p className="text-secondary small mb-0">
                        Change your LifeVault account password.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() =>
                        setShowPasswordForm(
                            (previous) =>
                                !previous
                        )
                    }
                >
                    {showPasswordForm
                        ? "Cancel"
                        : "Change Password"}
                </button>

            </div>

            {showPasswordForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-4"
                >
                    <div className="mb-3">
                        <label
                            htmlFor="currentPassword"
                            className="form-label"
                        >
                            Current Password
                        </label>

                        <input
                            id="currentPassword"
                            type="password"
                            className="form-control"
                            value={
                                currentPassword
                            }
                            onChange={(event) =>
                                setCurrentPassword(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="newPassword"
                            className="form-label"
                        >
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="confirmPassword"
                            className="form-label"
                        >
                            Confirm New Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            value={
                                confirmPassword
                            }
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    {message && (
                        <div className="alert alert-light border">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-dark"
                    >
                        Update Password
                    </button>
                </form>
            )}

        </div>
    );
}

export default SecuritySettings;