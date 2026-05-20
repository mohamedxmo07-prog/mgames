"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const COLORS = ["red", "blue", "green", "yellow"] as const;

export function SimonSays() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const playSequence = useCallback(async (seq: number[]) => {
    setIsPlaying(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      setActiveColor(seq[i]);
      await new Promise((r) => setTimeout(r, 400));
      setActiveColor(null);
    }
    setIsPlaying(false);
  }, []);

  function startGame() {
    const firstColor = Math.floor(Math.random() * 4);
    setSequence([firstColor]);
    setPlayerSequence([]);
    setGameOver(false);
    setScore(0);
    setTimeout(() => playSequence([firstColor]), 500);
  }

  function handleColorClick(colorIndex: number) {
    if (isPlaying || gameOver) return;

    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);
    setActiveColor(colorIndex);
    setTimeout(() => setActiveColor(null), 200);

    if (sequence[newPlayerSequence.length - 1] !== colorIndex) {
      setGameOver(true);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(sequence.length);
      const nextColor = Math.floor(Math.random() * 4);
      const newSequence = [...sequence, nextColor];
      setSequence(newSequence);
      setPlayerSequence([]);
      setTimeout(() => playSequence(newSequence), 1000);
    }
  }

  const colorClasses = {
    red: "bg-red-500 hover:bg-red-400",
    blue: "bg-blue-500 hover:bg-blue-400",
    green: "bg-green-500 hover:bg-green-400",
    yellow: "bg-yellow-500 hover:bg-yellow-400",
  };

  const activeClasses = {
    red: "bg-red-300 shadow-lg shadow-red-400",
    blue: "bg-blue-300 shadow-lg shadow-blue-400",
    green: "bg-green-300 shadow-lg shadow-green-400",
    yellow: "bg-yellow-300 shadow-lg shadow-yellow-400",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {gameOver ? `Game Over! Score: ${score}` : `Score: ${score}`}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {COLORS.map((color, index) => (
          <button
            key={color}
            onClick={() => handleColorClick(index)}
            disabled={isPlaying || sequence.length === 0}
            className={`w-20 h-20 rounded-lg transition-all ${
              activeColor === index ? activeClasses[color] : colorClasses[color]
            } disabled:opacity-50`}
          />
        ))}
      </div>
      <Button onClick={startGame} variant="outline">
        {sequence.length === 0 ? "Start Game" : "Restart"}
      </Button>
    </div>
  );
}
