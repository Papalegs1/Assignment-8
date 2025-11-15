// src/components/ComputerThrow.jsx
import PropTypes from 'prop-types';
import '../styles/ComputerThrow.css';

const THROW_IMAGES = {
  rock: '/images/rock.png',
  paper: '/images/paper.png',
  scissors: '/images/scissors.png',
};

function ComputerThrow({ computerThrow, isAnimating }) {
  const label = computerThrow
    ? computerThrow.charAt(0).toUpperCase() + computerThrow.slice(1)
    : 'Unknown';

  return (
    <section
      className="computer-throw"
      aria-label="Computer selection"
    >
      <h2>Computer&apos;s Throw</h2>
      <div
        className={
          'computer-display' +
          (isAnimating ? ' computer-display--animating' : '')
        }
      >
        {computerThrow ? (
          <img
            src={THROW_IMAGES[computerThrow]}
            alt={`Computer chose ${label}`}
            className="computer-image"
          />
        ) : (
          <span className="computer-placeholder" aria-hidden="true">
            ?
          </span>
        )}
      </div>
      <p className="computer-status" aria-live="polite">
        {isAnimating
          ? 'Computer is choosing...'
          : computerThrow
          ? `Computer chose ${label}.`
          : 'Waiting for your throw.'}
      </p>
    </section>
  );
}

ComputerThrow.propTypes = {
  computerThrow: PropTypes.string,
  isAnimating: PropTypes.bool.isRequired,
};

export default ComputerThrow;
