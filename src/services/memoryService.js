import mockMemories from "../data/mockMemories";

export function getMemoriesByUser(userId) {
  return mockMemories.filter(
    (memory) => memory.userId === userId
  );
}

export function getMemoryById(memoryId) {
  return mockMemories.find(
    (memory) => memory.id === memoryId
  );
}

export function searchMemories(memories, searchTerm) {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return memories;
  }

  return memories.filter((memory) => {
    return (
      memory.title.toLowerCase().includes(term) ||
      memory.description.toLowerCase().includes(term) ||
      memory.category.toLowerCase().includes(term) ||
      memory.location.toLowerCase().includes(term)
    );
  });
}