import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext(null);
const THEME_KEY = "lifevault_theme";

// --------------------------------------------------
// GET SAVED THEME
// --------------------------------------------------

function getStoredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "light";
}

// --------------------------------------------------
// GET SYSTEM THEME
// --------------------------------------------------

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// --------------------------------------------------
// THEME PROVIDER
// --------------------------------------------------

export function ThemeProvider({ children }) {
  const { user } = useAuth();

  const [theme, setTheme] = useState(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState("light");

  // ------------------------------------------------
  // SAVE USER PREFERENCE
  // ------------------------------------------------

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // ------------------------------------------------
  // APPLY THEME
  // ------------------------------------------------

  useEffect(() => {
    // ----------------------------------------------
    // PUBLIC PAGES
    // ----------------------------------------------

    if (!user) {
      // Public pages always remain light.
      document.documentElement.removeAttribute("data-theme");

      setResolvedTheme("light");

      return;
    }

    // ----------------------------------------------
    // LOGGED-IN PAGES
    // ----------------------------------------------

    const actualTheme = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(actualTheme);
    document.documentElement.setAttribute("data-theme", actualTheme);
  }, [user, theme]);

  // ------------------------------------------------
  // SYSTEM THEME CHANGES
  // ------------------------------------------------

  useEffect(() => {
    if (!user || theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleSystemThemeChange(event) {
      const actualTheme = event.matches ? "dark" : "light";
      setResolvedTheme(actualTheme);
      document.documentElement.setAttribute("data-theme", actualTheme);
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [user, theme]);

  // ------------------------------------------------
  // CONTEXT VALUE
  // ------------------------------------------------

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// --------------------------------------------------
// HOOK
// --------------------------------------------------

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
