import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../services/authService";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(getCurrentUser);

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const login = (
    email,
    password,
  ) => {
    const result =
      loginUser(
        email,
        password,
      );

    if (result.success) {
      setUser(result.user);
    }

    return result;
  };

  // --------------------------------------------------
  // REGISTER
  // --------------------------------------------------

  const register = (
    userData,
  ) => {
    return registerUser(
      userData,
    );
  };

  // --------------------------------------------------
  // UPDATE PROFILE
  // --------------------------------------------------

  const updateProfile = (
    profileData,
  ) => {
    if (!user) {
      return {
        success: false,
        message:
          "No authenticated user found.",
      };
    }

    const result =
      updateUserProfile(
        user.id,
        profileData,
      );

    if (result.success) {
      // Immediately update the React auth state.
      // This makes UserHeader re-render instantly.
      setUser(result.user);
    }

    return result;
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const logout = () => {
    logoutUser();

    setUser(null);
  };

  // --------------------------------------------------
  // CONTEXT VALUE
  // --------------------------------------------------

  const value = {
    user,

    isAuthenticated:
      Boolean(user),

    role:
      user?.role ?? null,

    login,
    register,
    updateProfile,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(
      AuthContext,
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}