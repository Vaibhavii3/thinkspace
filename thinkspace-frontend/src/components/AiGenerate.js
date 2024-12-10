import React, { useState } from "react";
import axios from "axios";
import "../styles/AiGenerate.css";

function AiGenerate() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [saved, setSaved] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();

        setError("");
        setResult("");
        // setSaved(false);
        
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

            console.log("API Response:", response.data);
            setResult(response.data.result || "Default content generated.");

        } catch (error) {
            console.error("Error:", error.response);
            setResult(`Error: ${error.response?.data?.error || "Internal Server Error"}`);
        }

        setLoading(false);
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
                {/* <button onClick={handleSave} disabled={saved}>
                        {saved ? "Saved" : "Save"}
                    </button> */}
                
                <ul className="result-content">
                {result.split("\n").filter(line => line.trim() !== "").map((line, index) => (
                <li key={index}>{line}</li>
            ))}
                </ul>
            </div>
        )}
    </div>
    </div>
    );
}

export default AiGenerate;
