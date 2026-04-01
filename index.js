import { useState } from "react";
import axios from "axios";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const optimize = async () => {
    const res = await axios.post("http://localhost:5000/optimize", {
      prompt,
      type: "general"
    });
    setResult(res.data.optimized);
  };

  return (
    <div className="p-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border w-full p-2"
      />

      <button onClick={optimize} className="bg-blue-500 text-white p-2 mt-2">
        Optimize Prompt
      </button>

      <pre className="mt-4">{result}</pre>
    </div>
  );
}