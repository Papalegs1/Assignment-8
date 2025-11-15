// src/components/PlayerThrow.jsx
import PropTypes from 'prop-types';
import '../styles/PlayerThrow.css';

const THROWS = [
  { id: 'rock', label: 'Rock', img: '/images/rock.png' },
  { id: 'paper', label: 'Paper', img: '/images/paper.png' },
  { id: 'scissors', label: 'Scissors', img: '/images/scissors.png' },
];

function PlayerThrow({ selectedThrow, onSelect, isDisabled }) {
  return (
    <section className="player-throw" aria-label="Player selection">
      <h2>Your Throw</h2>
      <p className="player-instruction">
        Click or press Enter/Space on an option to choose.
      </p>
      <div className="throw-options">
        {THROWS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={
              'throw-button' +
              (selectedThrow === t.id ? ' selected' : '')
            }
            onClick={() => onSelect(t.id)}
            disabled={isDisabled}
            aria-pressed={selectedThrow === t.id}
          >
            <img
              src={t.img}
              alt={t.label}
              className="throw-image"
            />
            <span className="throw-label">{t.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

PlayerThrow.propTypes = {
  selectedThrow: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default PlayerThrow;
