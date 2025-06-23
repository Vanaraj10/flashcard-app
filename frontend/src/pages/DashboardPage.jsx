import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { flashcardAPI } from '../services/api';
import FlashcardSetCard from '../components/FlashcardSetCard';
import './DashboardPage.css';

const DashboardPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setLoading(true);
    try {
      const result = await flashcardAPI.getAll();
      if (result.success) {
        setFlashcardSets(result.data);
        calculateStats(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load flashcards');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading your flashcards...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* Hero Section */}
        <div className="dashboard-hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome back! 🎉</h1>
            <p className="hero-subtitle">
              Ready to continue your learning journey? Your flashcards are waiting for you.
            </p>
            <Link to="/generate" className="btn btn-primary cta-btn">
              <span>Create New Flashcards</span>
              <span className="btn-icon">✨</span>
            </Link>
          </div>
          <div className="hero-illustration">
            <div className="floating-card">📚</div>
            <div className="floating-card">🧠</div>
            <div className="floating-card">⚡</div>
          </div>
        </div>

        {/* Flashcard Sets Section */}
        <div className="flashcards-section">
          <div className="section-header">
            <h2 className="section-title">Your Flashcard Sets</h2>
            <p className="section-subtitle">
              {flashcardSets.length > 0
                ? 'Click on any set to start studying'
                : 'No flashcards yet. Create your first set!'}
            </p>
          </div>

          {error && (
            <div className="error-container">
              <div className="error-message">{error}</div>
              <button onClick={loadFlashcards} className="btn btn-secondary">
                Try Again
              </button>
            </div>
          )}

          {flashcardSets.length === 0 && !error ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">No flashcards yet</h3>
              <p className="empty-description">
                Create your first set of AI-powered flashcards to get started on your learning journey.
              </p>
              <Link to="/generate" className="btn btn-primary">
                <span>Generate Flashcards</span>
                <span className="btn-icon">→</span>
              </Link>
            </div>
          ) : (
            <div className="flashcards-grid">
              {flashcardSets.map((set, index) => (
                <FlashcardSetCard
                  key={index}
                  set={set}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
