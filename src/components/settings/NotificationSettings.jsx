import { useState } from "react";
import settingsData from "../../data/settingsData";

function NotificationSettings() {
  const memoryDefault =
    settingsData.notifications.find((item) => item.id === "memoryReminder")
      ?.defaultValue ?? true;

  const goalDefault =
    settingsData.notifications.find((item) => item.id === "goalReminder")
      ?.defaultValue ?? true;

  const storageDefault =
    settingsData.notifications.find((item) => item.id === "storageAlerts")
      ?.defaultValue ?? true;

  const [memoryReminder, setMemoryReminder] = useState(memoryDefault);
  const [goalReminder, setGoalReminder] = useState(goalDefault);
  const [storageAlerts, setStorageAlerts] = useState(storageDefault);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="settings-option">
        <div>
          <strong>Memory Reminders</strong>

          <p className="text-secondary small mb-0">
            Remind you to record important moments.
          </p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={memoryReminder}
            onChange={(event) => setMemoryReminder(event.target.checked)}
          />
        </div>
      </div>

      <div className="settings-option">
        <div>
          <strong>Goal Reminders</strong>

          <p className="text-secondary small mb-0">
            Notify you about upcoming goal targets.
          </p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={goalReminder}
            onChange={(event) => setGoalReminder(event.target.checked)}
          />
        </div>
      </div>

      <div className="settings-option">
        <div>
          <strong>Storage Alerts</strong>

          <p className="text-secondary small mb-0">
            Notify you when storage becomes low.
          </p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={storageAlerts}
            onChange={(event) => setStorageAlerts(event.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
