import React, { useState } from "react";
import axios from "axios";
import "../styles/AiGenerate.css";

function AiGenerate() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setResult("Please enter a valid prompt.");
            return;
        }

        setLoading(true);
        setResult("");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-ai`,
                { prompt },
                { headers: { "Content-Type": "application/json" } }
            );
            setResult(response.data.result || "No content generated.");

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setResult(`Error: ${error.response.data.error}`);
            } else {
                setResult("Error generating content. Please try again.");
            }
            console.error("Error:", error);
        }

        setLoading(false);
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
