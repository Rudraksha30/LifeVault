import mockAchievements from "../data/mockAchievements";

export function getAchievementsByUser(userId) {
  return mockAchievements.filter(
    (achievement) => achievement.userId === userId
  );
}

export function getAchievementById(achievementId) {
  return mockAchievements.find(
    (achievement) => achievement.id === achievementId
  );
}

export function searchAchievements(
  achievements,
  searchTerm
) {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return achievements;
  }

  return achievements.filter((achievement) => {
    return (
      achievement.title.toLowerCase().includes(term) ||
      achievement.description.toLowerCase().includes(term) ||
      achievement.category.toLowerCase().includes(term) ||
      achievement.issuer.toLowerCase().includes(term)
    );
  });
}