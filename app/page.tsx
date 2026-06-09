"use client";

import { useState } from "react";
import { diseases } from "./data/diseases";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const analyzeSymptoms = () => {
  const inputSymptoms = symptoms
    .toLowerCase()
    .split(",")
    .map((s) => s.trim());

  const matched = diseases
    .map((disease) => {
      const matches = disease.symptoms.filter((symptom) =>
        inputSymptoms.includes(symptom)
      ).length;

      const score = Math.round(
        (matches / disease.symptoms.length) * 100
      );

      return {
        ...disease,
        score,
      };
    })
    .filter((disease) => disease.score > 0)
    .sort((a, b) => b.score - a.score);

  setResults(matched);
};

  return (
    <main className="min-h-screen bg-zinc-900 p-8 text-white">
  <div className="mx-auto max-w-3xl flex flex-col items-center">
      <h1 className="mb-3 text-center text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-rose-400 bg-clip-text text-transparent">
        AI Symptom Checker 🩺
      </h1>
      <p className="text-center text-zinc-300 mb-8">
  AI-powered symptom analysis tool
</p>

      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="fever, cough"
        className="w-full max-w-xl rounded-xl bg-zinc-800 border border-emerald-700 p-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        rows={4}
      />

      <br />

      <button
        onClick={analyzeSymptoms}
        className="mt-4 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500 transition-all"
      >
        Analyze Symptoms
      </button>

     <div className="mt-8 space-y-4">
  {results.map((disease, index) => (
    <div
      key={index}
      className="rounded-2xl bg-zinc-800 border border-emerald-900 p-5 shadow-xl"
    >
      <h2 className="text-xl font-bold text-rose-300">
        {disease.name}
      </h2>

      <p className="font-semibold text-emerald-400">
        Confidence Score: {disease.score}%
      </p>

      <p className="mt-2 text-zinc-400">
        Possible condition based on symptoms.
      </p>
    </div>
          ))}
    </div>

  </div>

</main>
  );
}