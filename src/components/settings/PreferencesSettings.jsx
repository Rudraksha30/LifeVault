import { useState } from "react";
import settingsData from "../../data/settingsData";
import { useTheme } from "../../context/ThemeContext";

function PreferencesSettings() {
  const { theme, setTheme } = useTheme();

  const [compactView, setCompactView] = useState(
    settingsData.preferences.find((item) => item.id === "compactView")
      ?.defaultValue ?? false,
  );

  const [showAnimations, setShowAnimations] = useState(
    settingsData.preferences.find((item) => item.id === "showAnimations")
      ?.defaultValue ?? true,
  );

  return (
    <div className="d-flex flex-column gap-3">
      {/* COMPACT VIEW */}

      <div className="settings-option">
        <div>
          <strong>Compact View</strong>

          <p className="text-secondary small mb-0">
            Show more content with less spacing.
          </p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={compactView}
            onChange={(event) => setCompactView(event.target.checked)}
          />
        </div>
      </div>

      {/* ANIMATIONS */}

      <div className="settings-option">
        <div>
          <strong>Animations</strong>

          <p className="text-secondary small mb-0">
            Enable interface animations.
          </p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showAnimations}
            onChange={(event) => setShowAnimations(event.target.checked)}
          />
        </div>
      </div>

      {/* APPEARANCE */}

      <div className="settings-option">
        <div>
          <strong>Appearance</strong>

          <p className="text-secondary small mb-0">
            Choose how LifeVault looks.
          </p>
        </div>

        <select
          className="form-select settings-select"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          aria-label="Theme"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="system">💻 System</option>
        </select>
      </div>

      {/* DATE FORMAT */}

      <div className="settings-option">
        <div>
          <strong>Date Format</strong>

          <p className="text-secondary small mb-0">
            Choose how dates appear in LifeVault.
          </p>
        </div>

        <select
          className="form-select settings-select"
          defaultValue="DD/MM/YYYY"
        >
          {settingsData.dateFormats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PreferencesSettings;
