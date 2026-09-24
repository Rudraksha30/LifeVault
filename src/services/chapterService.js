import mockChapters from "../data/mockChapters";

export function getChaptersByUser(userId) {
  return mockChapters.filter(
    (chapter) =>
      chapter.userId === userId &&
      chapter.status === "active"
  );
}

export function getChapterById(chapterId) {
  return mockChapters.find(
    (chapter) => chapter.id === chapterId
  );
}

export function searchChapters(chapters, searchTerm) {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return chapters;
  }

  return chapters.filter((chapter) => {
    return (
      chapter.title.toLowerCase().includes(term) ||
      chapter.description.toLowerCase().includes(term)
    );
  });
}