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
    <div className="app">
        <h1>AI Content Generator</h1>
        <form onSubmit={handleGenerate} className="form">

            <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your topic or prompt here..."
            rows="5"
            required
            ></textarea>

            <button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate"}
            </button>

        </form>

        {error && <p className="error">{error}</p>}

        {result && (
            <div className="result">
                <h3>Generated Content:</h3>
                <p>{result}</p>
            </div>
        )}
    </div>
    );
}

export default AiGenerate;
