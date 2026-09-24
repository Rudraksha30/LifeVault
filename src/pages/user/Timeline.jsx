import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import {
  getMemoriesByUser,
  searchMemories,
} from "../../services/memoryService";
import TimelineHeader from "../../components/timeline/TimelineHeader";
import TimelineFilters from "../../components/timeline/TimelineFilters";
import TimelineEvent from "../../components/timeline/TimelineEvent";
import MemoryDetailsModal from "../../components/timeline/MemoryDetailsModal";
import AddMemoryModal from "../../components/timeline/AddMemoryModal";

import "../../styles/timeline.css";

function Timeline() {
  const { user } = useAuth();
  const { files, addFiles, getAvailableStorageGB, deleteFile } = useStorage();
  const [memories, setMemories] = useState(() => getMemoriesByUser(user?.id));
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [mediaType, setMediaType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showAddMemory, setShowAddMemory] = useState(false);

  // --------------------------------------------------
  // RESOLVE MEMORY MEDIA FROM GLOBAL FILES
  // --------------------------------------------------

  const resolvedMemories = useMemo(() => {
    return memories.map((memory) => ({
      ...memory,

      media: (memory.media || [])
        .map((mediaFile) => {
          // Existing migrated memory files use fileId.
          if (mediaFile.fileId) {
            const globalFile = files.find(
              (file) => file.id === mediaFile.fileId,
            );

            if (globalFile) {
              return globalFile;
            }
          }

          // New memories already store their
          // global file records directly.
          return mediaFile;
        })
        .filter(Boolean),
    }));
  }, [memories, files]);

  // --------------------------------------------------
  // FILTERED MEMORIES
  // --------------------------------------------------

  const filteredMemories = useMemo(() => {
    let result = searchMemories(resolvedMemories, searchTerm);

    if (category !== "all") {
      result = result.filter((memory) => memory.category === category);
    }

    if (year !== "all") {
      result = result.filter(
        (memory) => new Date(memory.date).getFullYear().toString() === year,
      );
    }

    if (mediaType !== "all") {
      result = result.filter((memory) =>
        (memory.media || []).some((file) => file.type === mediaType),
      );
    }

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [resolvedMemories, searchTerm, category, year, mediaType, sortOrder]);

  // --------------------------------------------------
  // GROUP MEMORIES BY YEAR
  // --------------------------------------------------

  const groupedMemories = useMemo(() => {
    return filteredMemories.reduce((groups, memory) => {
      const memoryYear = new Date(memory.date).getFullYear();

      if (!groups[memoryYear]) {
        groups[memoryYear] = [];
      }

      groups[memoryYear].push(memory);

      return groups;
    }, {});
  }, [filteredMemories]);

  // --------------------------------------------------
  // SAVE MEMORY
  // --------------------------------------------------

  function handleSaveMemory(memoryData) {
    const selectedMedia = Array.isArray(memoryData.media)
      ? memoryData.media
      : [];

    const newMemoryId = Date.now();

    const storageFiles = selectedMedia.map((item, index) => ({
      id: `memory-${newMemoryId}-${index}`,
      name: item.file.name,
      type: item.type,
      size: item.file.size / (1024 * 1024),
      folder: "Memories",
      createdAt: new Date().toISOString(),
      url: item.previewUrl || null,
      source: "memory",
      sourceId: newMemoryId,
    }));

    // ------------------------------------------------
    // ADD MEDIA TO GLOBAL STORAGE
    // ------------------------------------------------

    let storageResult = {
      success: true,
      files: [],
    };

    if (storageFiles.length > 0) {
      storageResult = addFiles(storageFiles);

      if (!storageResult.success) {
        return storageResult;
      }
    }

    // ------------------------------------------------
    // CREATE MEMORY
    // ------------------------------------------------

    const newMemory = {
      ...memoryData,
      id: newMemoryId,
      userId: user.id,
      chapterId: null,
      media: storageResult.files || [],
    };

    setMemories((previous) => [newMemory, ...previous]);
    setShowAddMemory(false);

    return {
      success: true,
      message: "Memory saved successfully.",
    };
  }

  // --------------------------------------------------
  // MOVE MEMORY TO BIN
  // --------------------------------------------------

  function handleMoveMemoryToBin(memory) {
    if (!memory) {
      return;
    }

    const confirmed = window.confirm(
      `Move "${memory.title}" and its attached files to the Recycle Bin?`,
    );

    if (!confirmed) {
      return;
    }

    // Move every attached global file to
    // the existing Recycle Bin.
    const attachedFiles = memory.media || [];

    attachedFiles.forEach((file) => {
      const globalFileId = file.id || file.fileId;

      if (globalFileId) {
        deleteFile(globalFileId);
      }
    });

    // Remove the memory from the visible Timeline.
    setMemories((previousMemories) =>
      previousMemories.filter((item) => item.id !== memory.id),
    );

    // Close the memory details modal.
    setSelectedMemory(null);
  }

  // --------------------------------------------------
  // AVAILABLE STORAGE
  // --------------------------------------------------

  const availableStorage = getAvailableStorageGB();

  // --------------------------------------------------
  // YEARS
  // --------------------------------------------------

  const years = Object.keys(groupedMemories).sort((a, b) =>
    sortOrder === "newest" ? Number(b) - Number(a) : Number(a) - Number(b),
  );

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="container-fluid px-0">
      {/* HEADER */}

      <TimelineHeader onAddMemory={() => setShowAddMemory(true)} />

      {/* FILTERS */}

      <TimelineFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        year={year}
        setYear={setYear}
        mediaType={mediaType}
        setMediaType={setMediaType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* TIMELINE */}

      {filteredMemories.length === 0 ? (
        <div className="timeline-empty text-center p-5">
          <h3 className="h5 fw-bold mt-3">No memories found</h3>
          <p className="text-secondary">Try changing your search or filters.</p>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => setShowAddMemory(true)}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Memory
          </button>
        </div>
      ) : (
        <div className="timeline-wrapper">
          {years.map((timelineYear) => (
            <section className="timeline-year" key={timelineYear}>
              <h3 className="timeline-year-title">{timelineYear}</h3>

              {groupedMemories[timelineYear].map((memory) => (
                <TimelineEvent
                  key={memory.id}
                  memory={memory}
                  onView={setSelectedMemory}
                />
              ))}
            </section>
          ))}
        </div>
      )}

      {/* MEMORY DETAILS */}

      {selectedMemory && (
        <MemoryDetailsModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onMoveToBin={handleMoveMemoryToBin}
        />
      )}

      {/* ADD MEMORY */}

      {showAddMemory && (
        <AddMemoryModal
          onClose={() => setShowAddMemory(false)}
          onSave={handleSaveMemory}
          availableStorage={availableStorage}
        />
      )}
    </div>
  );
}

export default Timeline;
