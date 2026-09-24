import SettingsSection from "../../components/settings/SettingsSection";
import ProfileSettings from "../../components/settings/ProfileSettings";
import PreferencesSettings from "../../components/settings/PreferencesSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AccountSettings from "../../components/settings/AccountSettings";

import "../../styles/settings.css";

function Settings() {
    return (
        <div className="container-fluid px-0">

            {/* HEADER */}
            <section className="mb-4">

                <p className="text-secondary small mb-1">
                    Customize your LifeVault
                </p>

                <h2 className="fw-bold mb-1">
                    Settings
                </h2>

                <p className="text-secondary mb-0">
                    Manage your profile, preferences,
                    security and account.
                </p>

            </section>

            <div className="d-flex flex-column gap-4">

                {/* PROFILE */}
                <SettingsSection
                    icon="bi-person"
                    title="Profile"
                    description="Manage your basic account information."
                >
                    <ProfileSettings />
                </SettingsSection>

                {/* PREFERENCES */}
                <SettingsSection
                    icon="bi-sliders"
                    title="Preferences"
                    description="Customize how LifeVault looks and behaves."
                >
                    <PreferencesSettings />
                </SettingsSection>

                {/* NOTIFICATIONS */}
                <SettingsSection
                    icon="bi-bell"
                    title="Notifications"
                    description="Choose which reminders and alerts you receive."
                >
                    <NotificationSettings />
                </SettingsSection>

                {/* SECURITY */}
                <SettingsSection
                    icon="bi-shield-lock"
                    title="Security"
                    description="Manage your password and account security."
                >
                    <SecuritySettings />
                </SettingsSection>

                {/* ACCOUNT */}
                <SettingsSection
                    icon="bi-person-gear"
                    title="Account"
                    description="Sign out or permanently delete your account."
                >
                    <AccountSettings />
                </SettingsSection>

            </div>
        </div>
    );
}

export default Settings;