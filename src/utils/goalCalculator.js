export function getCompletedMilestones(goal) {
    return goal.milestones.filter(
        (milestone) => milestone.isCompleted
    ).length;
}

export function getTotalMilestones(goal) {
    return goal.milestones.length;
}

export function calculateGoalProgress(goal) {
    const total = getTotalMilestones(goal);

    if (total === 0) {
        return 0;
    }

    const completed = getCompletedMilestones(goal);

    return Math.round(
        (completed / total) * 100
    );
}

export function isGoalComplete(goal) {
    return (
        goal.milestones.length > 0 &&
        goal.milestones.every(
            (milestone) => milestone.isCompleted
        )
    );
}

export function getGoalStatus(goal) {
    if (isGoalComplete(goal)) {
        return "completed";
    }

    if (
        goal.targetDate &&
        new Date(goal.targetDate) < new Date()
    ) {
        return "overdue";
    }

    return goal.status || "active";
}