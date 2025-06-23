import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import FlashCard from '../components/FlashCard';
import './FlashcardSetPage.css';

const FlashcardSetPage = () => {
  const { setId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [flashcardSet, setFlashcardSet] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });

  useEffect(() => {
    // Get flashcard set from location state or fetch from API
    if (location.state?.set) {
      setFlashcardSet(location.state.set);
    } else {
      // If no state, redirect to dashboard
      navigate('/dashboard');
    }
  }, [location.state, navigate]);

  const currentCard = flashcardSet?.flashcards[currentCardIndex];

  const handleCardFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleAnswer = (correct) => {
    setStudiedCards(prev => new Set([...prev, currentCardIndex]));
    setSessionStats(prev => ({
      ...prev,
      [correct ? 'correct' : 'incorrect']: prev[correct ? 'correct' : 'incorrect'] + 1,
      total: prev.total + 1,
    }));
    
    // Move to next card after a short delay
    setTimeout(() => {
      handleNextCard();
    }, 500);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcardSet.flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleCardSelect = (index) => {
    setCurrentCardIndex(index);
    setShowAnswer(false);
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setStudiedCards(new Set());
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const isSessionComplete = currentCardIndex === flashcardSet?.flashcards.length - 1 && sessionStats.total > 0;

  if (!flashcardSet) {
    return (
      <div className="flashcard-set-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading flashcards...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-set-container">
      <div className="container">
        {/* Header */}
        <div className="study-header">
          <div className="header-content">
            <Link to="/dashboard" className="back-btn">
              <span className="back-icon">←</span>
              Back to Dashboard
            </Link>
            <div className="header-info">
              <h1 className="set-title">{flashcardSet.topic}</h1>
              <div className="progress-info">
                <span className="card-counter">
                  {currentCardIndex + 1} of {flashcardSet.flashcards.length}
                </span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${((currentCardIndex + 1) / flashcardSet.flashcards.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Session Stats */}
          {sessionStats.total > 0 && (
            <div className="session-stats">
              <div className="stat-item correct">
                <span className="stat-icon">✅</span>
                <span className="stat-value">{sessionStats.correct}</span>
              </div>
              <div className="stat-item incorrect">
                <span className="stat-icon">❌</span>
                <span className="stat-value">{sessionStats.incorrect}</span>
              </div>
              <div className="stat-item total">
                <span className="stat-icon">📊</span>
                <span className="stat-value">{sessionStats.total}</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Study Area */}
        <div className="study-area">
          <FlashCard
            card={currentCard}
            showAnswer={showAnswer}
            onFlip={handleCardFlip}
            onAnswer={handleAnswer}
            isStudied={studiedCards.has(currentCardIndex)}
          />
          
          {/* Navigation Controls */}
          <div className="study-controls">
            <button
              className="btn btn-secondary nav-btn"
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
            >
              <span>← Previous</span>
            </button>
            
            <div className="card-dots">
              {flashcardSet.flashcards.map((_, index) => (
                <button
                  key={index}
                  className={`card-dot ${index === currentCardIndex ? 'active' : ''} ${studiedCards.has(index) ? 'studied' : ''}`}
                  onClick={() => handleCardSelect(index)}
                  title={`Card ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              className="btn btn-secondary nav-btn"
              onClick={handleNextCard}
              disabled={currentCardIndex === flashcardSet.flashcards.length - 1}
            >
              <span>Next →</span>
            </button>
          </div>
        </div>

        {/* Session Complete Modal */}
        {isSessionComplete && (
          <div className="session-complete-modal">
            <div className="modal-content">
              <div className="completion-icon">🎉</div>
              <h2 className="completion-title">Great Job!</h2>
              <p className="completion-message">
                You've completed this flashcard set!
              </p>
              <div className="final-stats">
                <div className="final-stat">
                  <span className="final-stat-value">{sessionStats.correct}</span>
                  <span className="final-stat-label">Correct</span>
                </div>
                <div className="final-stat">
                  <span className="final-stat-value">{sessionStats.incorrect}</span>
                  <span className="final-stat-label">Incorrect</span>
                </div>
                <div className="final-stat">
                  <span className="final-stat-value">
                    {Math.round((sessionStats.correct / sessionStats.total) * 100)}%
                  </span>
                  <span className="final-stat-label">Accuracy</span>
                </div>
              </div>
              <div className="completion-actions">
                <button className="btn btn-primary" onClick={resetSession}>
                  Study Again
                </button>
                <Link to="/dashboard" className="btn btn-secondary">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSetPage;
