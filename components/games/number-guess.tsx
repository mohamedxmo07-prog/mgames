"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NumberGuess() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState<{ num: number; hint: string }[]>([]);

  function handleGuess() {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("Please enter a valid number between 1 and 100");
      return;
    }

    setAttempts((a) => a + 1);

    if (num === target) {
      setMessage(`Correct! You found it in ${attempts + 1} attempts!`);
      setWon(true);
      setHistory([...history, { num, hint: "✓" }]);
    } else if (num < target) {
      setMessage("Too low! Try higher.");
      setHistory([...history, { num, hint: "↑" }]);
    } else {
      setMessage("Too high! Try lower.");
      setHistory([...history, { num, hint: "↓" }]);
    }
    setGuess("");
  }

  function resetGame() {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Guess a number between 1 and 100");
    setAttempts(0);
    setWon(false);
    setHistory([]);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div className="text-center">
        <p className="text-lg font-semibold">{message}</p>
        {!won && <p className="text-sm text-muted-foreground">Attempts: {attempts}</p>}
      </div>
      {!won && (
        <div className="flex gap-2 w-full">
          <Input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            placeholder="Enter guess"
            min={1}
            max={100}
          />
          <Button onClick={handleGuess}>Guess</Button>
        </div>
      )}
      {history.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {history.map((h, i) => (
            <span
              key={i}
              className={`px-2 py-1 text-xs rounded ${
                h.hint === "✓"
                  ? "bg-green-100 text-green-700"
                  : h.hint === "↑"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {h.num} {h.hint}
            </span>
          ))}
        </div>
      )}
      <Button onClick={resetGame} variant="outline">
        New Game
      </Button>
    </div>
  );
}
