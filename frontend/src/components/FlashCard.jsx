import { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, showAnswer, onFlip, onAnswer, isStudied }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      onFlip();
      setIsFlipping(false);
    }, 200);
  };

  const handleAnswer = (correct) => {
    onAnswer(correct);
  };

  if (!card) return null;

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipping ? 'flipping' : ''} ${showAnswer ? 'flipped' : ''} ${isStudied ? 'studied' : ''}`}
        onClick={handleFlip}
      >
        <div className="flashcard-inner">
          {/* Front of card (Question) */}
          <div className="flashcard-front">
            <div className="card-header">
              <span className="card-type">Question</span>
              <span className="flip-hint">Click to flip</span>
            </div>
            <div className="card-content">
              <div className="question-icon">❓</div>
              <p className="card-text">{card.question}</p>
            </div>
            <div className="card-footer">
              <div className="flip-indicator">
                <span className="flip-arrow">↻</span>
                <span>Tap to reveal answer</span>
              </div>
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className="flashcard-back">
            <div className="card-header">
              <span className="card-type">Answer</span>
              <span className="flip-hint">Click to flip back</span>
            </div>
            <div className="card-content">
              <div className="answer-icon">💡</div>
              <p className="card-text">{card.answer}</p>
            </div>
            <div className="card-footer">
              <div className="answer-buttons" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="answer-btn incorrect"
                  onClick={() => handleAnswer(false)}
                >
                  <span className="btn-icon">❌</span>
                  <span>Incorrect</span>
                </button>
                <button 
                  className="answer-btn correct"
                  onClick={() => handleAnswer(true)}
                >
                  <span className="btn-icon">✅</span>
                  <span>Correct</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Study indicator */}
        {isStudied && (
          <div className="study-badge">
            <span className="badge-icon">✓</span>
            <span className="badge-text">Studied</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
