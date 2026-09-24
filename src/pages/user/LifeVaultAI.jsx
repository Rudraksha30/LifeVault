import AIActionCard from "../../components/ai/AIActionCard";

import AIMemoryAssistant from "../../components/ai/AIMemoryAssistant";

import AIGoalAssistant from "../../components/ai/AIGoalAssistant";

import "../../styles/ai.css";

function LifeVaultAI() {
  return (
    <div className="container-fluid px-0">
      {/* HEADER */}
      <section className="mb-4">
        <p className="text-secondary small mb-1">
          Your intelligent LifeVault assistant
        </p>

        <h2 className="fw-bold mb-1">LifeVault AI ✨</h2>

        <p className="text-secondary mb-0">
          Use AI to organize, understand and improve your personal archive.
        </p>
      </section>

      {/* AI ACTIONS */}
      <section className="mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-6 col-xl-4">
            <AIActionCard
              icon="bi-stars"
              title="Create Memory"
              description="Turn your description into a structured memory."
              onClick={() =>
                document.getElementById("memory-ai")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <AIActionCard
              icon="bi-bullseye"
              title="Build a Goal"
              description="Generate useful milestones for your goal."
              onClick={() =>
                document.getElementById("goal-ai")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            />
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <AIActionCard
              icon="bi-lightbulb"
              title="Life Insights"
              description="Analyze patterns in your LifeVault."
              onClick={() => {}}
            />
          </div>
        </div>
      </section>

      {/* MEMORY AI */}
      <section id="memory-ai" className="mb-4">
        <AIMemoryAssistant />
      </section>

      {/* GOAL AI */}
      <section id="goal-ai" className="mb-4">
        <AIGoalAssistant />
      </section>

      {/* PRIVACY NOTICE */}
      <section>
        <div className="alert alert-light border d-flex gap-3">
          <i className="bi bi-shield-check fs-4"></i>

          <div>
            <strong>Your data stays under your control.</strong>

            <p className="text-secondary small mb-0">
              LifeVault AI will only use the information required for the AI
              feature you choose.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LifeVaultAI;
