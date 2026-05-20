"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 5;

export function LightsOut() {
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = useCallback(() => {
    const newGrid: boolean[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(false));

    // Random initial state with guaranteed solution
    for (let i = 0; i < 10; i++) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      toggleLight(newGrid, r, c);
    }

    setGrid(newGrid);
    setMoves(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  function toggleLight(g: boolean[][], row: number, col: number) {
    const toggle = (r: number, c: number) => {
      if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
        g[r][c] = !g[r][c];
      }
    };
    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);
  }

  function handleClick(row: number, col: number) {
    const newGrid = grid.map((r) => [...r]);
    toggleLight(newGrid, row, col);
    setGrid(newGrid);
    setMoves((m) => m + 1);
  }

  const isWon = grid.length > 0 && grid.every((row) => row.every((cell) => !cell));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {isWon ? `You won in ${moves} moves!` : `Moves: ${moves}`}
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[200px]">
        Turn off all the lights. Clicking a light toggles it and its neighbors.
      </p>
      <div className="grid gap-1 bg-muted p-2 rounded-lg">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`w-10 h-10 rounded transition-all ${
                  cell
                    ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
      <Button onClick={initializeGame} variant="outline">
        New Game
      </Button>
    </div>
  );
}
