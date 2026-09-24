import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="lifevault-home overflow-hidden">
      <section className="lifevault-hero py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="lv-eyebrow">
                <i className="bi bi-shield-check"></i> Your story, safely kept
              </span>
              <h1 className="display-4 fw-bold mt-3 mb-3">
                Preserve the moments that make you, <span>you.</span>
              </h1>
              <p className="lead text-secondary mb-4">
                LifeVault is your private digital home for memories, milestones,
                important documents, and the goals still ahead.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/register" className="btn btn-primary btn-lg px-4">
                  Create your vault <i className="bi bi-arrow-right ms-1"></i>
                </Link>
                <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
                  Sign in
                </Link>
              </div>
              <div className="d-flex flex-wrap gap-4 mt-4 small text-secondary">
                <span>
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Private by design
                </span>
                <span>
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Organised your way
                </span>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="vault-preview shadow-lg">
                <div className="vault-preview-top">
                  <span></span>
                  <span></span>
                  <span></span>
                  <small>My LifeVault</small>
                </div>
                <div className="vault-preview-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <small className="text-secondary">GOOD MORNING</small>
                      <h2 className="h4 mb-0 mt-1">Your life, in one place.</h2>
                    </div>
                    <div className="vault-avatar">R</div>
                  </div>
                  <div className="vault-memory-card">
                    <div className="memory-icon">
                      <i className="bi bi-camera"></i>
                    </div>
                    <div>
                      <small className="text-secondary">ON THIS DAY</small>
                      <strong>Goa, 2024</strong>
                      <span>Sunsets worth remembering</span>
                    </div>
                  </div>
                  <div className="row g-3 mt-1">
                    <div className="col-6">
                      <div className="vault-stat">
                        <i className="bi bi-images"></i>
                        <strong>128</strong>
                        <span>Memories</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="vault-stat">
                        <i className="bi bi-bullseye"></i>
                        <strong>6</strong>
                        <span>Active goals</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-lg-4 text-center">
          <span className="lv-eyebrow">Everything that matters</span>
          <h2 className="fw-bold mt-3">
            A calmer way to keep your life together.
          </h2>
          <p
            className="text-secondary mx-auto mb-5"
            style={{ maxWidth: "620px" }}
          >
            Bring meaningful moments and practical details into a single,
            easy-to-return-to space.
          </p>
          <div className="row g-4 text-start">
            <Feature
              icon="bi-heart"
              title="Capture memories"
              text="Save photos, stories, and the little details you never want to lose."
            />
            <Feature
              icon="bi-folder2-open"
              title="Keep documents close"
              text="Store important files where you can find them when life gets busy."
            />
            <Feature
              icon="bi-flag"
              title="Follow your goals"
              text="Turn future plans into clear milestones and celebrate your progress."
            />
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="lv-cta text-center p-4 p-md-5">
            <i className="bi bi-safe2-fill fs-1"></i>
            <h2 className="fw-bold mt-3">Your life deserves a safe place.</h2>
            <p className="mb-4">Start building your personal archive today.</p>
            <Link to="/register" className="btn btn-light btn-lg px-4">
              Get started for free
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="lv-footer py-4 border-top">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <Link to="/" className="navbar-brand fw-bold mb-0">
            <i className="bi bi-safe2 me-2"></i>LifeVault
          </Link>
          <p className="small text-secondary mb-0">
            © {new Date().getFullYear()} LifeVault. Your memories, safely kept.
          </p>
          <div className="d-flex gap-3 small">
            <Link to="/login">Sign in</Link>
            <Link to="/register">Get started</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="col-md-4">
      <article className="lv-feature h-100">
        <div className="lv-feature-icon">
          <i className={`bi ${icon}`}></i>
        </div>
        <h3 className="h5 fw-bold mt-3">{title}</h3>
        <p className="text-secondary mb-0">{text}</p>
      </article>
    </div>
  );
}

export default Home;
