// src/App.jsx
import { useState, useRef, useEffect } from 'react';
import PlayerThrow from './components/PlayerThrow.jsx';
import ComputerThrow from './components/ComputerThrow.jsx';
import ResultDisplay from './components/ResultDisplay.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';

const THROWS = ['rock', 'paper', 'scissors'];

function determineWinner(player, computer) {
  if (!player || !computer) return null;
  if (player === computer) return 'tie';

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }

  return 'lose';
}

function App() {
  const [playerThrow, setPlayerThrow] = useState(null);
  const [computerThrow, setComputerThrow] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
  });

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  function clearTimers() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => {
    // Cleanup if component ever unmounts
    return () => {
      clearTimers();
    };
  }, []);

  function handlePlayerSelect(choice) {
    if (isAnimating) return; // ignore clicks during animation

    setPlayerThrow(choice);
    setResult(null);
    setComputerThrow(null);
    setIsAnimating(true);

    let index = 0;

    intervalRef.current = setInterval(() => {
      index = (index + 1) % THROWS.length;
      setComputerThrow(THROWS[index]);
    }, 500);

    timeoutRef.current = setTimeout(() => {
      clearTimers();

      const finalThrow =
        THROWS[Math.floor(Math.random() * THROWS.length)];
      setComputerThrow(finalThrow);

      const outcome = determineWinner(choice, finalThrow);
      setResult(outcome);

      setScore((prev) => {
        if (outcome === 'win') {
          return { ...prev, wins: prev.wins + 1 };
        }
        if (outcome === 'lose') {
          return { ...prev, losses: prev.losses + 1 };
        }
        if (outcome === 'tie') {
          return { ...prev, ties: prev.ties + 1 };
        }
        return prev;
      });

      setIsAnimating(false);
    }, 3000);
  }

  function handleReset() {
    clearTimers();
    setPlayerThrow(null);
    setComputerThrow(null);
    setResult(null);
    setIsAnimating(false);
    setScore({ wins: 0, losses: 0, ties: 0 });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Rock · Paper · Scissors</h1>
        <p>Play against the computer and track your score.</p>
      </header>

      <main className="app-main">
        <section className="throws-section" aria-label="Game area">
          <PlayerThrow
            selectedThrow={playerThrow}
            onSelect={handlePlayerSelect}
            isDisabled={isAnimating}
          />

          <ComputerThrow
            computerThrow={computerThrow}
            isAnimating={isAnimating}
          />
        </section>

        <section className="result-section">
          <ResultDisplay
            result={result}
            playerThrow={playerThrow}
            computerThrow={computerThrow}
          />
        </section>

        <section className="score-section">
          <ScoreBoard
            wins={score.wins}
            losses={score.losses}
            ties={score.ties}
            onReset={handleReset}
          />
        </section>
      </main>

      <footer className="app-footer">
        <small>Built with React, hooks, and pure RPS vibes 🪨📄✂️</small>
      </footer>
    </div>
  );
}

export default App;
