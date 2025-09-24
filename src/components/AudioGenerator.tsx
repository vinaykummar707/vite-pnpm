import { generateAndUploadAudio } from "@/utilities/generateAndUploadAudio";
import React, { useState } from "react";

const languages = [
  { code: "en-IN", name: "English (India)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "te-IN", name: "Telugu" },
  { code: "ta-IN", name: "Tamil" },
  { code: "gu-IN", name: "Gujarati" },
];

const speakers = ["anushka", "arjun", "default"];

const AudioGenerator: React.FC = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en-IN");
  const [speaker, setSpeaker] = useState("anushka");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please enter text!");
      return;
    }
    setLoading(true);
    try {
      const { fileUrl } = await generateAndUploadAudio(text, lang, speaker);
      setAudioUrl(fileUrl);
    } catch {
      alert("Error generating audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded max-w-md space-y-3">
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>

      <select
        className="w-full border p-2 rounded"
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
      >
        {speakers.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate & Upload Audio"}
      </button>

      {audioUrl && (
        <div className="mt-3">
          <p>✅ Uploaded successfully!</p>
          <audio controls src={audioUrl} className="mt-2 w-full" />
        </div>
      )}
    </div>
  );
};

export default AudioGenerator;
