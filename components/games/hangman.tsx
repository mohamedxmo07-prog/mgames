"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const WORDS = [
  "JAVASCRIPT", "PROGRAMMING", "DEVELOPER", "COMPUTER", "ALGORITHM",
  "DATABASE", "INTERNET", "SOFTWARE", "KEYBOARD", "MONITOR"
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Hangman() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;

  const initGame = useCallback(() => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const maskedWord = word
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");

  const isWon = word && word.split("").every((letter) => guessedLetters.has(letter));
  const isLost = wrongGuesses >= maxWrong;

  function handleGuess(letter: string) {
    if (guessedLetters.has(letter) || isWon || isLost) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!word.includes(letter)) {
      setWrongGuesses((w) => w + 1);
    }
  }

  const hangmanParts = [
    <circle key="head" cx="50" cy="25" r="10" stroke="currentColor" fill="none" strokeWidth="2" />,
    <line key="body" x1="50" y1="35" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />,
    <line key="leftArm" x1="50" y1="40" x2="35" y2="50" stroke="currentColor" strokeWidth="2" />,
    <line key="rightArm" x1="50" y1="40" x2="65" y2="50" stroke="currentColor" strokeWidth="2" />,
    <line key="leftLeg" x1="50" y1="60" x2="35" y2="75" stroke="currentColor" strokeWidth="2" />,
    <line key="rightLeg" x1="50" y1="60" x2="65" y2="75" stroke="currentColor" strokeWidth="2" />,
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="100" height="100" className="text-foreground">
        <line x1="10" y1="95" x2="90" y2="95" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="95" x2="30" y2="5" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="5" x2="50" y2="5" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="5" x2="50" y2="15" stroke="currentColor" strokeWidth="2" />
        {hangmanParts.slice(0, wrongGuesses)}
      </svg>

      <div className="text-2xl font-mono tracking-widest">{maskedWord}</div>

      <div className="text-sm text-muted-foreground">
        Wrong guesses: {wrongGuesses} / {maxWrong}
      </div>

      {isWon && <div className="text-lg font-semibold text-green-600">You won!</div>}
      {isLost && (
        <div className="text-lg font-semibold text-red-600">
          Game Over! The word was: {word}
        </div>
      )}

      <div className="flex flex-wrap gap-1 max-w-[280px] justify-center">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.has(letter) || isWon || isLost}
            className={`w-7 h-7 text-sm font-medium rounded transition-colors ${
              guessedLetters.has(letter)
                ? word.includes(letter)
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-secondary hover:bg-secondary/80"
            } disabled:cursor-not-allowed`}
          >
            {letter}
          </button>
        ))}
      </div>

      <Button onClick={initGame} variant="outline">
        New Word
      </Button>
    </div>
  );
}
