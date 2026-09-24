import { useState } from "react";
import { generateMemorySuggestion } from "../../services/aiService";
import AIResponse from "./AIResponse";

function AIMemoryAssistant() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  function handleGenerate() {
    const response = generateMemorySuggestion(text);

    if (!response.success) {
      setResult({
        error: response.message,
      });

      return;
    }

    setResult(response.result);
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-bold">✨ Create a Memory with AI</h3>

        <p className="text-secondary">
          Tell LifeVault what happened and AI will suggest how to organize it.
        </p>

        <textarea
          className="form-control"
          rows="5"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Example: I graduated from college on 18 August 2026 and celebrated with my family..."
        ></textarea>

        <button
          type="button"
          className="btn btn-dark mt-3"
          onClick={handleGenerate}
        >
          <i className="bi bi-stars me-2"></i>
          Generate Suggestion
        </button>

        {result?.error && (
          <div className="alert alert-danger mt-3 mb-0">{result.error}</div>
        )}

        {result && !result.error && (
          <AIResponse title="AI Suggestion">
            <div className="mb-3">
              <small className="text-secondary">Suggested Title</small>
              <p className="fw-semibold mb-0">{result.title}</p>
            </div>

            <div className="mb-3">
              <small className="text-secondary">Suggested Description</small>
              <p className="mb-0">{result.description}</p>
            </div>

            <div className="d-flex gap-2">
              <span className="badge text-bg-light">{result.category}</span>
              <span className="badge text-bg-warning">{result.importance}</span>
            </div>
          </AIResponse>
        )}
      </div>
    </div>
  );
}

export default AIMemoryAssistant;
