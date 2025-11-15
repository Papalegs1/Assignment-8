// src/components/ResultDisplay.jsx
import PropTypes from 'prop-types';
import '../styles/ResultDisplay.css';

function getResultMessage(result) {
  if (result === 'win') return 'You win this round! 🎉';
  if (result === 'lose') return 'You lost this round. 😢';
  if (result === 'tie') return 'It’s a tie! 😮';
  return 'Make a selection to start the game.';
}

function ResultDisplay({ result, playerThrow, computerThrow }) {
  return (
    <section
      className="result-display"
      aria-label="Round result"
      aria-live="polite"
    >
      <h2>Result</h2>
      <p className="result-message">{getResultMessage(result)}</p>

      {playerThrow && computerThrow && (
        <div className="result-summary">
          <p>
            <strong>You:</strong> {playerThrow}
          </p>
          <p>
            <strong>Computer:</strong> {computerThrow}
          </p>
        </div>
      )}
    </section>
  );
}

ResultDisplay.propTypes = {
  result: PropTypes.string,
  playerThrow: PropTypes.string,
  computerThrow: PropTypes.string,
};

export default ResultDisplay;
