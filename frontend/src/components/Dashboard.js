import React from "react";

export default function Dashboard({ username, history }) {
  return (
    <div className="min-h-screen p-6 bg-red text-yellow-400">
      <h2 className="text-5xl font-extrabold mb-8 text-center text-yellow-400 drop-shadow-lg">
        {username}'s Dashboard
      </h2>

      {history.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No results yet. Start practicing!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {history.map((h, i) => (
            <div
              key={i}
              className="bg-gray-900 shadow-2xl rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/50"
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-300">{h.date}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-yellow-800/20 text-yellow-300 rounded-full text-sm font-semibold">
                  Total: {h.totalChars}
                </span>
                <span className="px-3 py-1 bg-green-800/20 text-green-400 rounded-full text-sm font-semibold">
                  Correct: {h.correctChars}
                </span>
                <span className="px-3 py-1 bg-red-800/20 text-red-400 rounded-full text-sm font-semibold">
                  Wrong: {h.wrongChars}
                </span>
                <span className="px-3 py-1 bg-yellow-800/20 text-yellow-300 rounded-full text-sm font-semibold">
                  Time: {h.timeTaken}s
                </span>
                <span className="px-3 py-1 bg-purple-800/20 text-purple-400 rounded-full text-sm font-semibold">
                  CPM: {h.charsPerMinute}
                </span>
              </div>

              <p className="font-mono bg-gray-800 p-4 rounded-xl text-yellow-300 break-words shadow-inner">
                Snippet: {h.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
