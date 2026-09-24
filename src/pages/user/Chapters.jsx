import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  getChaptersByUser,
  searchChapters,
} from "../../services/chapterService";

import {
  getMemoriesByUser,
} from "../../services/memoryService";

import ChapterCard from "../../components/chapter/ChapterCard";
import ChapterSearch from "../../components/chapter/ChapterSearch";
import CreateChapterModal from "../../components/chapter/CreateChapterModal";
import ChapterDetails from "../../components/chapter/ChapterDetails";

import "../../styles/chapters.css";

function Chapters() {
  const { user } = useAuth();

  const [chapters, setChapters] = useState(() =>
    getChaptersByUser(user?.id)
  );

  const [memories] = useState(() =>
    getMemoriesByUser(user?.id)
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [selectedChapter, setSelectedChapter] =
    useState(null);

  const filteredChapters = useMemo(() => {
    return searchChapters(
      chapters,
      searchTerm
    );
  }, [chapters, searchTerm]);

  function getChapterMemories(chapterId) {
    return memories.filter(
      (memory) => memory.chapterId === chapterId
    );
  }

  function handleCreateChapter(chapterData) {
    const newChapter = {
      ...chapterData,
      id: Date.now(),
      userId: user.id,
    };

    setChapters((previous) => [
      ...previous,
      newChapter,
    ]);

    setShowCreateModal(false);
  }

  return (
    <div className="container-fluid px-0">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-secondary small mb-1">
            Organize your journey
          </p>

          <h2 className="fw-bold mb-1">
            My Life Chapters
          </h2>

          <p className="text-secondary mb-0">
            Group your memories into meaningful parts
            of your life.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Create Chapter
        </button>
      </div>

      {/* Search */}
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <ChapterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <span className="text-secondary small">
          {filteredChapters.length}{" "}
          {filteredChapters.length === 1
            ? "chapter"
            : "chapters"}
        </span>
      </div>

      {/* Chapter Grid */}
      {filteredChapters.length > 0 ? (
        <div className="row g-4">
          {filteredChapters.map((chapter) => {
            const chapterMemories =
              getChapterMemories(chapter.id);

            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                memoryCount={
                  chapterMemories.length
                }
                achievementCount={0}
                goalCount={0}
                onOpen={setSelectedChapter}
              />
            );
          })}
        </div>
      ) : (
        <div className="timeline-empty text-center p-5">
          <i className="bi bi-book fs-1 text-secondary"></i>

          <h3 className="h5 fw-bold mt-3">
            No chapters found
          </h3>

          <p className="text-secondary">
            Try another search or create your first
            chapter.
          </p>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() =>
              setShowCreateModal(true)
            }
          >
            <i className="bi bi-plus-lg me-2"></i>
            Create Chapter
          </button>
        </div>
      )}

      {/* Create Chapter */}
      {showCreateModal && (
        <CreateChapterModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onSave={handleCreateChapter}
        />
      )}

      {/* Chapter Details */}
      {selectedChapter && (
        <ChapterDetails
          chapter={selectedChapter}
          memories={getChapterMemories(
            selectedChapter.id
          )}
          onClose={() =>
            setSelectedChapter(null)
          }
        />
      )}

    </div>
  );
}

export default Chapters;