"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

const GRID_SIZE = 8;
const MINE_COUNT = 10;

export function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const initializeGame = useCallback(() => {
    const newGrid: Cell[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
          }))
      );

    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].adjacentMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  function revealCell(row: number, col: number) {
    if (gameOver || won || grid[row]?.[col]?.isRevealed || grid[row]?.[col]?.isFlagged) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));

    if (newGrid[row][col].isMine) {
      newGrid.forEach((r) => r.forEach((c) => { if (c.isMine) c.isRevealed = true; }));
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    function reveal(r: number, c: number) {
      if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return;
      if (newGrid[r][c].isRevealed || newGrid[r][c].isFlagged || newGrid[r][c].isMine) return;

      newGrid[r][c].isRevealed = true;

      if (newGrid[r][c].adjacentMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(r + dr, c + dc);
          }
        }
      }
    }

    reveal(row, col);
    setGrid(newGrid);

    const allNonMinesRevealed = newGrid.every((r) =>
      r.every((c) => c.isMine || c.isRevealed)
    );
    if (allNonMinesRevealed) setWon(true);
  }

  function toggleFlag(e: React.MouseEvent, row: number, col: number) {
    e.preventDefault();
    if (gameOver || won || grid[row][col].isRevealed) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {won ? "You won!" : gameOver ? "Game Over!" : "Right-click to flag"}
      </div>
      <div className="grid gap-0.5 bg-muted p-1 rounded">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                className={`w-7 h-7 text-xs font-bold flex items-center justify-center rounded-sm transition-colors ${
                  cell.isRevealed
                    ? cell.isMine
                      ? "bg-red-500"
                      : "bg-background"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? "💣"
                    : cell.adjacentMines > 0
                    ? cell.adjacentMines
                    : ""
                  : cell.isFlagged
                  ? "🚩"
                  : ""}
              </button>
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
