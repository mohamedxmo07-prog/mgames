"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const EMOJIS = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎵", "🎹"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  function initializeGame() {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsChecking(false);
  }

  function handleCardClick(id: number) {
    if (isChecking || flippedCards.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);
      const [first, second] = newFlipped;
      const firstCard = newCards.find((c) => c.id === first);
      const secondCard = newCards.find((c) => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        setCards(
          newCards.map((c) =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(
            newCards.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }

  const isWon = cards.length > 0 && cards.every((c) => c.isMatched);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        {isWon ? `You won in ${moves} moves!` : `Moves: ${moves}`}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-14 h-14 rounded-lg text-2xl flex items-center justify-center transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      <Button onClick={initializeGame} variant="outline">
        New Game
      </Button>
    </div>
  );
}
