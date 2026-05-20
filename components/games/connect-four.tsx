"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Player = 1 | 2 | null;

export function ConnectFour() {
  const [board, setBoard] = useState<Player[][]>(
    Array(6).fill(null).map(() => Array(7).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<Player>(null);

  function dropPiece(col: number) {
    if (winner) return;

    const newBoard = board.map((row) => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        break;
      }
    }
  }

  function checkWinner(b: Player[][], row: number, col: number, player: Player): boolean {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    
    for (const [dr, dc] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && b[r][c] === player) count++;
        else break;
      }
      for (let i = 1; i < 4; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && b[r][c] === player) count++;
        else break;
      }
      if (count >= 4) return true;
    }
    return false;
  }

  function resetGame() {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setCurrentPlayer(1);
    setWinner(null);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {winner ? (
          <span className={winner === 1 ? "text-red-500" : "text-yellow-500"}>
            Player {winner} wins!
          </span>
        ) : (
          <span className={currentPlayer === 1 ? "text-red-500" : "text-yellow-500"}>
            Player {currentPlayer}&apos;s turn
          </span>
        )}
      </div>
      <div className="bg-blue-600 p-2 rounded-lg">
        <div className="grid grid-cols-7 gap-1">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => dropPiece(colIndex)}
                className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center"
              >
                {cell && (
                  <div
                    className={`w-6 h-6 rounded-full ${
                      cell === 1 ? "bg-red-500" : "bg-yellow-400"
                    }`}
                  />
                )}
              </button>
            ))
          )}
        </div>
      </div>
      <Button onClick={resetGame} variant="outline">
        Reset Game
      </Button>
    </div>
  );
}
