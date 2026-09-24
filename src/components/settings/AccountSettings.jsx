import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function AccountSettings() {
    const {
        user,
        logout,
    } = useAuth();

    const [showDeleteWarning, setShowDeleteWarning] =
        useState(false);
    const [confirmation, setConfirmation] =
        useState("");

    function handleSignOut() {
        logout();
    }

    function handleDeleteAccount() {
        if (confirmation !== "DELETE") {
            return;
        }

        /*
         * Permanent account deletion will later
         * be handled by Spring Boot.
         */
        localStorage.clear();

        logout();
    }

    return (
        <div>

            {/* SIGN OUT */}
            <div className="settings-account-row">

                <div>
                    <strong>
                        Sign Out
                    </strong>

                    <p className="text-secondary small mb-0">
                        Sign out of your LifeVault account.
                        Your data will not be deleted.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleSignOut}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                </button>

            </div>

            <hr />

            {/* DELETE ACCOUNT */}
            <div className="settings-account-row">

                <div>
                    <strong className="text-danger">
                        Delete Account
                    </strong>

                    <p className="text-secondary small mb-0">
                        Permanently delete your account
                        and all associated LifeVault data.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() =>
                        setShowDeleteWarning(
                            true
                        )
                    }
                >
                    <i className="bi bi-trash me-2"></i>
                    Delete Account
                </button>

            </div>

            {/* DELETE WARNING */}
            {showDeleteWarning && (
                <div className="delete-account-warning mt-4">

                    <div className="d-flex gap-3">

                        <i className="bi bi-exclamation-triangle-fill text-danger fs-4"></i>

                        <div>
                            <h6 className="fw-bold text-danger">
                                This action cannot be undone.
                            </h6>

                            <p className="small mb-2">
                                Deleting your account will
                                permanently remove your
                                memories, achievements,
                                goals, documents, storage
                                purchases and other
                                LifeVault data.
                            </p>

                            <p className="small mb-3">
                                Type{" "}
                                <strong>DELETE</strong>{" "}
                                below to confirm.
                            </p>

                            <input
                                type="text"
                                className="form-control mb-3"
                                value={
                                    confirmation
                                }
                                onChange={(event) =>
                                    setConfirmation(
                                        event.target.value
                                    )
                                }
                                placeholder="Type DELETE"
                            />

                            <div className="d-flex gap-2">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowDeleteWarning(
                                            false
                                        );

                                        setConfirmation(
                                            ""
                                        );
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    disabled={
                                        confirmation !==
                                        "DELETE"
                                    }
                                    onClick={
                                        handleDeleteAccount
                                    }
                                >
                                    Permanently Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-3 text-secondary small">
                Signed in as{" "}
                <strong>
                    {user?.email || "current user"}
                </strong>
            </div>

        </div>
    );
}

export default AccountSettings;