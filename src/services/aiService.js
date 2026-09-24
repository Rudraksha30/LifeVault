function generateMemorySuggestion(text) {
    const cleanedText = text.trim();

    if (!cleanedText) {
        return {
            success: false,
            message:
                "Please enter some information about your memory.",
        };
    }

    return {
        success: true,
        result: {
            title:
                cleanedText.length > 45
                    ? `${cleanedText.substring(0, 45)}...`
                    : cleanedText,

            description:
                `This memory describes an important moment: ${cleanedText}`,

            category: "Personal",

            importance:
                cleanedText.length > 100
                    ? "Major"
                    : "Normal",
        },
    };
}

function generateGoalMilestones(goalTitle) {
    const title = goalTitle.trim();

    if (!title) {
        return {
            success: false,
            message:
                "Please enter a goal first.",
        };
    }

    return {
        success: true,
        milestones: [
            `Understand the basics of ${title}`,
            `Practice ${title} regularly`,
            `Complete a small project related to ${title}`,
            `Review and improve your skills`,
            `Complete the final ${title} milestone`,
        ],
    };
}

function improveDescription(description) {
    const text = description.trim();

    if (!text) {
        return {
            success: false,
            message:
                "Please enter a description.",
        };
    }

    return {
        success: true,
        result:
            text.charAt(0).toUpperCase() +
            text.slice(1) +
            ".",
    };
}

export {
    generateMemorySuggestion,
    generateGoalMilestones,
    improveDescription,
};