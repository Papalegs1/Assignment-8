// src/components/ScoreBoard.jsx
import PropTypes from 'prop-types';
import '../styles/ScoreBoard.css';

function ScoreBoard({ wins, losses, ties, onReset }) {
  return (
    <section className="scoreboard" aria-label="Scoreboard">
      <h2>Score Board</h2>
      <div className="score-grid" role="status" aria-live="polite">
        <div className="score-item">
          <span className="score-label">Wins</span>
          <span className="score-value">{wins}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Losses</span>
          <span className="score-value">{losses}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Ties</span>
          <span className="score-value">{ties}</span>
        </div>
      </div>
      <button
        type="button"
        className="reset-button"
        onClick={onReset}
      >
        Reset Game
      </button>
    </section>
  );
}

ScoreBoard.propTypes = {
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired,
  ties: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ScoreBoard;
