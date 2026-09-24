import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { getGoalsByUser, searchGoals } from "../../services/goalService";

import { calculateGoalProgress } from "../../utils/goalCalculator";

import GoalCard from "../../components/goal/GoalCard";
import GoalDetails from "../../components/goal/GoalDetails";
import CreateGoalModal from "../../components/goal/CreateGoalModal";

import "../../styles/goals.css";

function Goals() {
  const { user } = useAuth();

  const [goals, setGoals] = useState(() => getGoalsByUser(user?.id));

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [selectedGoal, setSelectedGoal] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredGoals = useMemo(() => {
    let result = searchGoals(goals, searchTerm);

    if (statusFilter !== "all") {
      result = result.filter((goal) => {
        const progress = calculateGoalProgress(goal);

        if (statusFilter === "completed") {
          return progress === 100;
        }

        if (statusFilter === "active") {
          return progress < 100;
        }

        return true;
      });
    }

    if (categoryFilter !== "all") {
      result = result.filter((goal) => goal.category === categoryFilter);
    }

    return result;
  }, [goals, searchTerm, statusFilter, categoryFilter]);

  const activeGoals = goals.filter(
    (goal) => calculateGoalProgress(goal) < 100,
  ).length;

  const completedGoals = goals.filter(
    (goal) => calculateGoalProgress(goal) === 100,
  ).length;

  const totalMilestones = goals.reduce(
    (total, goal) => total + goal.milestones.length,
    0,
  );

  const completedMilestones = goals.reduce(
    (total, goal) =>
      total +
      goal.milestones.filter((milestone) => milestone.isCompleted).length,
    0,
  );

  const overallProgress =
    totalMilestones === 0
      ? 0
      : Math.round((completedMilestones / totalMilestones) * 100);

  function handleCreateGoal(goalData) {
    const newGoal = {
      ...goalData,
      id: Date.now(),
      userId: user.id,
      chapterId: null,
      status: "active",
      completedDate: null,
    };

    setGoals((previous) => [...previous, newGoal]);

    setShowCreateModal(false);
  }

  function handleToggleMilestone(goalId, milestoneId) {
    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== goalId) {
          return goal;
        }

        const updatedMilestones = goal.milestones.map((milestone) => {
          if (milestone.id !== milestoneId) {
            return milestone;
          }

          const completed = !milestone.isCompleted;

          return {
            ...milestone,
            isCompleted: completed,
            completedDate: completed
              ? new Date().toISOString().split("T")[0]
              : null,
          };
        });

        const updatedGoal = {
          ...goal,
          milestones: updatedMilestones,
        };

        const progress = calculateGoalProgress(updatedGoal);

        if (progress === 100) {
          return {
            ...updatedGoal,
            status: "completed",
            completedDate: new Date().toISOString().split("T")[0],
          };
        }

        return {
          ...updatedGoal,
          status: "active",
          completedDate: null,
        };
      }),
    );

    setSelectedGoal((previous) => {
      if (!previous || previous.id !== goalId) {
        return previous;
      }

      const updatedMilestones = previous.milestones.map((milestone) => {
        if (milestone.id !== milestoneId) {
          return milestone;
        }

        const completed = !milestone.isCompleted;

        return {
          ...milestone,
          isCompleted: completed,
          completedDate: completed
            ? new Date().toISOString().split("T")[0]
            : null,
        };
      });

      const updatedGoal = {
        ...previous,
        milestones: updatedMilestones,
      };

      const progress = calculateGoalProgress(updatedGoal);

      return {
        ...updatedGoal,
        status: progress === 100 ? "completed" : "active",
        completedDate:
          progress === 100 ? new Date().toISOString().split("T")[0] : null,
      };
    });
  }

  return (
    <div className="container-fluid px-0">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-secondary small mb-1">Keep moving forward</p>

          <h2 className="fw-bold mb-1">My Goals</h2>

          <p className="text-secondary mb-0">
            Turn your plans into achievements.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Create Goal
        </button>
      </div>

      {/* STATISTICS */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              <small className="text-secondary">Active</small>

              <h3 className="fw-bold mb-0 mt-1">{activeGoals}</h3>

              <span className="small text-secondary">Goals</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              <small className="text-secondary">Completed</small>

              <h3 className="fw-bold mb-0 mt-1">{completedGoals}</h3>

              <span className="small text-secondary">Goals</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              <small className="text-secondary">Milestones</small>

              <h3 className="fw-bold mb-0 mt-1">
                {completedMilestones}/{totalMilestones}
              </h3>

              <span className="small text-secondary">Completed</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              <small className="text-secondary">Overall</small>
              <h3 className="fw-bold mb-0 mt-1">{overallProgress}%</h3>
              <span className="small text-secondary">Milestone Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-2">
            <div className="col-12 col-lg-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="search"
                  className="form-control"
                  placeholder="Search goals..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All Goals</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="col-6 col-lg-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Career">Career</option>
                <option value="Education">Education</option>
                <option value="Projects">Projects</option>
                <option value="Personal">Personal</option>
                <option value="Finance">Finance</option>
                <option value="Travel">Travel</option>
                <option value="Skills">Skills</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* GOALS */}
      {filteredGoals.length > 0 ? (
        <div className="row g-4">
          {filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onView={setSelectedGoal} />
          ))}
        </div>
      ) : (
        <div className="timeline-empty text-center p-5">
          <i className="bi bi-bullseye fs-1 text-secondary"></i>

          <h3 className="h5 fw-bold mt-3">No goals found</h3>

          <p className="text-secondary">
            Try changing your filters or create a new goal.
          </p>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Create Goal
          </button>
        </div>
      )}

      {/* CREATE GOAL */}
      {showCreateModal && (
        <CreateGoalModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateGoal}
        />
      )}

      {/* GOAL DETAILS */}
      {selectedGoal && (
        <GoalDetails
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onToggleMilestone={handleToggleMilestone}
        />
      )}
    </div>
  );
}

export default Goals;
