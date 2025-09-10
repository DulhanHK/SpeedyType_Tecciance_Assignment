import React, { useState, useEffect, useRef } from "react";
import snippets from "../data/snippets";

export default function Practice({ onFinish }) {
  const [snippet, setSnippet] = useState("");
  const [typed, setTyped] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const inputRef = useRef(null);

  const loadSnippet = () => {
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    setSnippet(randomSnippet);
    setTyped([]);
    setStartTime(null);
    setTimeLeft(10);
    inputRef.current?.focus();
  };

  useEffect(() => {
    loadSnippet();
  }, []);

  useEffect(() => {
    let interval = null;
    if (startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTimeLeft(Math.max(10 - elapsed, 0));
        if (elapsed >= 10) {
          finishTyping();
          clearInterval(interval);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, typed]);

  const finishTyping = () => {
    const totalChars = typed.length;
    const correctChars = typed.filter((t) => t.correct).length;
    const wrongChars = totalChars - correctChars;
    const timeTaken = (10 - timeLeft).toFixed(2);
    const charsPerMinute = ((correctChars / timeTaken) * 60).toFixed(2);

    onFinish({
      snippet,
      date: new Date().toLocaleString(),
      totalChars,
      correctChars,
      wrongChars,
      timeTaken,
      charsPerMinute,
    });

    loadSnippet();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime && value.length > 0) setStartTime(Date.now());

    const updatedTyped = value.split("").map((char, idx) => ({
      char,
      correct: snippet[idx] === char,
    }));
    setTyped(updatedTyped);
  };

  return (
    <div>
      
      {/* Snippet */}
      <div className="w-full max-w-2xl bg-gray-900 text-white p-6 rounded-lg font-mono text-lg shadow-md text-center break-words">
        {snippet.split("").map((char, idx) => {
          let style = { color: "#6B7280" }; // default gray
          if (idx < typed.length) {
            style.color = typed[idx].correct ? "#FBBF24" : "#EF4444";
          }
          return <span key={idx} style={style}>{char}</span>;
        })}
      </div>

      {/* Time Left */}
      <p className="text-gray-700 font-semibold text-lg">
        Time Left: <span className="text-yellow-500">{timeLeft.toFixed(2)}</span>s
      </p>

      {/* Input */}
      <input
        ref={inputRef}
        autoFocus
        onChange={handleChange}
        value={typed.map((t) => t.char).join("")}
        placeholder="Start typing here..."
        className="w-full max-w-2xl p-4 border-2 border-yellow-400 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow"
      />
    </div>
  );
}
