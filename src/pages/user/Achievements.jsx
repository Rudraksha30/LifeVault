import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  getAchievementsByUser,
  searchAchievements,
} from "../../services/achievementService";

import AchievementStats from "../../components/achievement/AchievementStats";
import AchievementFilters from "../../components/achievement/AchievementFilters";
import AchievementCard from "../../components/achievement/AchievementCard";
import AddAchievementModal from "../../components/achievement/AddAchievementModal";
import AchievementDetails from "../../components/achievement/AchievementDetails";

import "../../styles/achievements.css";

function Achievements() {
  const { user } = useAuth();

  const [achievements, setAchievements] =
    useState(() =>
      getAchievementsByUser(user?.id)
    );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const [year, setYear] =
    useState("all");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedAchievement, setSelectedAchievement] =
    useState(null);

  const filteredAchievements = useMemo(() => {
    let result = searchAchievements(
      achievements,
      searchTerm
    );

    if (category !== "all") {
      result = result.filter(
        (achievement) =>
          achievement.category === category
      );
    }

    if (year !== "all") {
      result = result.filter(
        (achievement) =>
          new Date(
            achievement.date
          )
            .getFullYear()
            .toString() === year
      );
    }

    return [...result].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );
  }, [
    achievements,
    searchTerm,
    category,
    year,
  ]);

  function handleSaveAchievement(
    achievementData
  ) {
    const newAchievement = {
      ...achievementData,
      id: Date.now(),
      userId: user.id,
      chapterId: null,
      goalId: null,
    };

    setAchievements((previous) => [
      newAchievement,
      ...previous,
    ]);

    setShowAddModal(false);
  }

  return (
    <div className="container-fluid px-0">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-secondary small mb-1">
            Celebrate your journey
          </p>

          <h2 className="fw-bold mb-1">
            My Achievements
          </h2>

          <p className="text-secondary mb-0">
            Every milestone worth remembering.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          onClick={() =>
            setShowAddModal(true)
          }
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Achievement
        </button>
      </div>

      {/* Statistics */}
      <AchievementStats
        achievements={achievements}
      />

      {/* Filters */}
      <AchievementFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        year={year}
        setYear={setYear}
      />

      {/* Results */}
      {filteredAchievements.length > 0 ? (
        <div className="row g-4">
          {filteredAchievements.map(
            (achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onView={
                  setSelectedAchievement
                }
              />
            )
          )}
        </div>
      ) : (
        <div className="timeline-empty text-center p-5">
          <i className="bi bi-trophy fs-1 text-secondary"></i>

          <h3 className="h5 fw-bold mt-3">
            No achievements found
          </h3>

          <p className="text-secondary">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Achievement
          </button>
        </div>
      )}

      {/* Add Achievement */}
      {showAddModal && (
        <AddAchievementModal
          onClose={() =>
            setShowAddModal(false)
          }
          onSave={
            handleSaveAchievement
          }
        />
      )}

      {/* Achievement Details */}
      {selectedAchievement && (
        <AchievementDetails
          achievement={
            selectedAchievement
          }
          onClose={() =>
            setSelectedAchievement(
              null
            )
          }
        />
      )}

    </div>
  );
}

export default Achievements;