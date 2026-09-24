const settingsData = {
    dateFormats: [
        {
            value: "DD/MM/YYYY",
            label: "DD/MM/YYYY",
        },
        {
            value: "MM/DD/YYYY",
            label: "MM/DD/YYYY",
        },
        {
            value: "YYYY-MM-DD",
            label: "YYYY-MM-DD",
        },
    ],

    preferences: [
        {
            id: "compactView",
            title: "Compact View",
            description:
                "Show more content with less spacing.",
            defaultValue: false,
        },
        {
            id: "showAnimations",
            title: "Animations",
            description:
                "Enable interface animations.",
            defaultValue: true,
        },
    ],

    notifications: [
        {
            id: "memoryReminder",
            title: "Memory Reminders",
            description:
                "Remind you to record important moments.",
            defaultValue: true,
        },
        {
            id: "goalReminder",
            title: "Goal Reminders",
            description:
                "Notify you about upcoming goal targets.",
            defaultValue: true,
        },
        {
            id: "storageAlerts",
            title: "Storage Alerts",
            description:
                "Notify you when storage becomes low.",
            defaultValue: true,
        },
    ],
};

export default settingsData;