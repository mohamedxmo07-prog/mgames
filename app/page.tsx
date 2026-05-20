import { AdSenseBanner } from "@/components/adsense-banner";
import { GameCard } from "@/components/game-card";
import { TicTacToe } from "@/components/games/tic-tac-toe";
import { MemoryMatch } from "@/components/games/memory-match";
import { SlidingPuzzle } from "@/components/games/sliding-puzzle";
import { ConnectFour } from "@/components/games/connect-four";
import { Minesweeper } from "@/components/games/minesweeper";
import { SimonSays } from "@/components/games/simon-says";
import { NumberGuess } from "@/components/games/number-guess";
import { Hangman } from "@/components/games/hangman";
import { WordScramble } from "@/components/games/word-scramble";
import { LightsOut } from "@/components/games/lights-out";

const games = [
  {
    title: "Tic-Tac-Toe",
    description: "Classic X and O battle",
    icon: "⭕",
    component: <TicTacToe />,
  },
  {
    title: "Memory Match",
    description: "Find matching pairs",
    icon: "🎴",
    component: <MemoryMatch />,
  },
  {
    title: "Sliding Puzzle",
    description: "Arrange the numbers",
    icon: "🧩",
    component: <SlidingPuzzle />,
  },
  {
    title: "Connect Four",
    description: "Get 4 in a row",
    icon: "🔴",
    component: <ConnectFour />,
  },
  {
    title: "Minesweeper",
    description: "Avoid the mines",
    icon: "💣",
    component: <Minesweeper />,
  },
  {
    title: "Simon Says",
    description: "Repeat the pattern",
    icon: "🎨",
    component: <SimonSays />,
  },
  {
    title: "Number Guess",
    description: "Guess 1-100",
    icon: "🔢",
    component: <NumberGuess />,
  },
  {
    title: "Hangman",
    description: "Guess the word",
    icon: "📝",
    component: <Hangman />,
  },
  {
    title: "Word Scramble",
    description: "Unscramble the letters",
    icon: "🔤",
    component: <WordScramble />,
  },
  {
    title: "Lights Out",
    description: "Turn off all lights",
    icon: "💡",
    component: <LightsOut />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Ad Banner */}
      <div className="w-full max-w-5xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="top-banner-001" format="horizontal" />
      </div>

      {/* Header */}
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Classic Games Arcade
        </h1>
        <p className="text-muted-foreground text-lg">
          Play 10 timeless puzzle and board games - all free, no downloads!
        </p>
      </header>

      {/* Games Grid */}
      <main className="max-w-5xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              icon={game.icon}
            >
              {game.component}
            </GameCard>
          ))}
        </div>
      </main>

      {/* Bottom Ad Banner */}
      <div className="w-full max-w-5xl mx-auto px-4 pb-6">
        <AdSenseBanner slot="bottom-banner-002" format="horizontal" />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Classic Games Arcade. All games are free to play.</p>
        <p className="mt-1">
          These are modern HTML5 recreations of classic puzzle and board games.
        </p>
      </footer>
    </div>
  );
}
