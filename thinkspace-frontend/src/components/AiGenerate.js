import React, { useState } from "react";
import axios from "axios";
import "../styles/AiGenerate.css";

function AiGenerate() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async (e) => {
        e.preventDefault();

        setError("");
        setResult("");

        if (!prompt.trim()) {
            setResult("Please enter a valid prompt.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-ai`,
                { prompt },
                { headers: { "Content-Type": "application/json" } }
            );

            setResult(response.data.result || "No content generated.");

        } catch (error) {
            console.error("Error:", error);
            setResult(`Error: ${error.response?.data?.error || "Internal Server Error"}`);
        }
};

return (
    <div className="ai-generate-container">

    <div className="app-container">
        <h1 className="title"> ✨ AI Content Generator ✨ </h1>
        <form onSubmit={handleGenerate} className="ai-form">

            <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your topic or prompt here..."
            rows="5"
            className="prompt-input"
            required
            ></textarea>

            <button type="submit" className="generate-btn"  disabled={loading}>
                {loading ? "Generating..." : "Generate"}
            </button>

        </form>

        {error && <p className="error">{error}</p>}

        {result && (
            <div className="result">
                <h3 className="result-title">Generated Content:</h3>
                <p className="result-content">{result}</p>
            </div>
        )}
    </div>
    </div>
    );
}

export default AiGenerate;
