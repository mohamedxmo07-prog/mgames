"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function SlidingPuzzle() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  function initializeGame() {
    let shuffled: number[];
    do {
      shuffled = [...Array(15).keys()].map((n) => n + 1).concat([0]);
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (!isSolvable(shuffled));
    setTiles(shuffled);
    setMoves(0);
  }

  function isSolvable(puzzle: number[]): boolean {
    let inversions = 0;
    for (let i = 0; i < puzzle.length - 1; i++) {
      for (let j = i + 1; j < puzzle.length; j++) {
        if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) {
          inversions++;
        }
      }
    }
    const emptyRow = Math.floor(puzzle.indexOf(0) / 4);
    return (inversions + emptyRow) % 2 === 1;
  }

  function handleTileClick(index: number) {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const col = index % 4;
    const emptyCol = emptyIndex % 4;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves((m) => m + 1);
    }
  }

  const isWon = tiles.slice(0, 15).every((tile, index) => tile === index + 1);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {isWon ? `Solved in ${moves} moves!` : `Moves: ${moves}`}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => handleTileClick(index)}
            disabled={tile === 0}
            className={`w-12 h-12 rounded text-lg font-bold flex items-center justify-center transition-all ${
              tile === 0
                ? "bg-transparent"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {tile !== 0 && tile}
          </button>
        ))}
      </div>
      <Button onClick={initializeGame} variant="outline">
        Shuffle
      </Button>
    </div>
  );
}
