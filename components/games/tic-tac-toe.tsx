"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function calculateWinner(squares: Player[]): Player {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {winner ? `Winner: ${winner}` : isDraw ? "Draw!" : `Next: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-16 h-16 bg-secondary hover:bg-secondary/80 rounded-lg text-2xl font-bold flex items-center justify-center transition-colors"
          >
            {cell}
          </button>
        ))}
      </div>
      <Button onClick={resetGame} variant="outline">
        Reset Game
      </Button>
    </div>
  );
}
