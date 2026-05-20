"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WORDS = [
  { word: "PUZZLE", hint: "A game that tests your problem-solving skills" },
  { word: "ARCADE", hint: "A place with many video games" },
  { word: "JOYSTICK", hint: "A gaming controller" },
  { word: "CONSOLE", hint: "PlayStation or Xbox" },
  { word: "TETRIS", hint: "Classic falling blocks game" },
  { word: "MARIO", hint: "Famous plumber character" },
  { word: "PIXEL", hint: "Smallest unit of a digital image" },
  { word: "LEVEL", hint: "A stage in a game" },
  { word: "SCORE", hint: "Points earned in a game" },
  { word: "PLAYER", hint: "Someone who plays games" },
];

export function WordScramble() {
  const [currentWord, setCurrentWord] = useState({ word: "", hint: "" });
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const scrambleWord = (word: string): string => {
    const arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("") === word ? scrambleWord(word) : arr.join("");
  };

  const newWord = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
    setScrambled(scrambleWord(randomWord.word));
    setGuess("");
    setMessage("");
    setRevealed(false);
  }, []);

  useEffect(() => {
    newWord();
  }, [newWord]);

  function handleSubmit() {
    if (guess.toUpperCase() === currentWord.word) {
      setMessage("Correct!");
      setScore((s) => s + 1);
      setRevealed(true);
    } else {
      setMessage("Try again!");
    }
  }

  function skipWord() {
    setMessage(`The word was: ${currentWord.word}`);
    setRevealed(true);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div className="text-sm text-muted-foreground">Score: {score}</div>
      
      <div className="text-3xl font-bold tracking-widest text-primary">
        {scrambled}
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Hint: {currentWord.hint}
      </div>

      {!revealed ? (
        <>
          <div className="flex gap-2 w-full">
            <Input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Your guess"
              className="uppercase"
            />
            <Button onClick={handleSubmit}>Check</Button>
          </div>
          <Button onClick={skipWord} variant="ghost" size="sm">
            Skip
          </Button>
        </>
      ) : (
        <Button onClick={newWord}>Next Word</Button>
      )}

      {message && (
        <div
          className={`text-sm font-medium ${
            message === "Correct!" ? "text-green-600" : "text-orange-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
