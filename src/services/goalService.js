import mockGoals from "../data/mockGoal";

export function getGoalsByUser(userId) {
    return mockGoals.filter(
        (goal) => goal.userId === userId
    );
}

export function getGoalById(goalId) {
    return mockGoals.find(
        (goal) => goal.id === goalId
    );
}

export function searchGoals(goals, searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
        return goals;
    }

    return goals.filter((goal) => {
        return (
            goal.title.toLowerCase().includes(term) ||
            goal.description.toLowerCase().includes(term) ||
            goal.category.toLowerCase().includes(term)
        );
    });
}