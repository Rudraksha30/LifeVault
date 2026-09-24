import { useStorage } from "../../context/StorageContext";
import StatsCard from "../../components/dashboard/StatsCard";
import StorageOverview from "../../components/dashboard/StorageOverview";
import RecentMemories from "../../components/dashboard/RecentMemories";
import GoalProgress from "../../components/dashboard/GoalProgress";
import LifeVaultAIPreview from "../../components/dashboard/LifeVaultAIPreview";
import OnThisDay from "../../components/dashboard/OnThisDay";
import QuickActions from "../../components/dashboard/QuickActions";
import { calculateUsedStorageGB } from "../../services/storageService";

import "../../styles/dashboard.css";

function Dashboard() {
  const { storage, files } = useStorage();

  // Use the global file system so Dashboard,
  // Documents and Storage all show the same usage.
  const usedStorageGB = calculateUsedStorageGB(files);

  return (
    <div className="container-fluid px-0">
      {/* Welcome */}
      <section className="mb-4">
        <p className="text-secondary mb-1">Your personal archive</p>
        <h2 className="fw-bold mb-2">Your Life at a Glance 👋</h2>
        <p className="text-secondary mb-0">
          Keep your memories, achievements, goals and important moments
          organized in one place.
        </p>
      </section>

      {/* Statistics */}
      <section className="row g-3 mb-4">
        <StatsCard
          icon="bi-camera"
          value="42"
          label="Memories"
          iconClass="text-primary"
        />

        <StatsCard
          icon="bi-trophy"
          value="12"
          label="Achievements"
          iconClass="text-warning"
        />

        <StatsCard
          icon="bi-book"
          value="6"
          label="Chapters"
          iconClass="text-success"
        />

        <StatsCard
          icon="bi-bullseye"
          value="8"
          label="Goals"
          iconClass="text-danger"
        />
      </section>

      {/* Storage + Goals */}
      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-5">
          <StorageOverview
            usedStorage={Number(usedStorageGB.toFixed(2))}
            totalStorage={storage.totalGB}
          />
        </div>

        <div className="col-12 col-xl-7">
          <GoalProgress />
        </div>
      </section>

      {/* Memories + On This Day */}
      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-7">
          <RecentMemories />
        </div>

        <div className="col-12 col-xl-5">
          <OnThisDay />
        </div>
      </section>

      {/* AI */}
      <section className="mb-4">
        <LifeVaultAIPreview />
      </section>

      {/* Quick Actions */}
      <section className="row g-4">
        <div className="col-12 col-lg-5 col-xl-4">
          <QuickActions />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
