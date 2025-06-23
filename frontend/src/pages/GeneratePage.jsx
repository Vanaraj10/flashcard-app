import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flashcardAPI } from '../services/api';
import './GeneratePage.css';

const GeneratePage = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await flashcardAPI.generate(topic.trim());
      
      if (result.success) {
        setSuccess('Flashcards generated successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (suggestedTopic) => {
    setTopic(suggestedTopic);
    setError('');
    setSuccess('');
  };

  return (
    <div className="generate-container">
      <div className="container">
        <div className="generate-content">
          {/* Header Section */}
          <div className="generate-header">
            <div className="header-icon">✨</div>
            <h1 className="generate-title">Generate AI Flashcards</h1>
            <p className="generate-subtitle">
              Enter any topic and let our AI create personalized flashcards for you. 
              Perfect for studying, memorization, and knowledge retention.
            </p>
          </div>

          {/* Main Form */}
          <div className="generate-form-container">
            <form className="generate-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="topic">
                  What topic would you like to study?
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="topic"
                    className="input topic-input"
                    placeholder="e.g., Machine Learning, Spanish Vocabulary, World History..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={loading}
                  />
                  <div className="input-icon">🎯</div>
                </div>
              </div>

              {error && (
                <div className="error-message fade-in">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              {success && (
                <div className="success-message fade-in">
                  <span className="success-icon">✅</span>
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary generate-btn"
                disabled={loading || !topic.trim()}
              >
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    Generating flashcards...
                  </div>
                ) : (
                  <>
                    <span>Generate Flashcards</span>
                    <span className="btn-icon">🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h3 className="features-title">Why AI-Generated Flashcards?</h3>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div className="feature-content">
                  <h4 className="feature-name">Targeted Learning</h4>
                  <p className="feature-description">
                    AI creates questions that focus on key concepts and important details
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h4 className="feature-name">Instant Generation</h4>
                  <p className="feature-description">
                    Get 10 high-quality flashcards in seconds, no manual creation needed
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📚</div>
                <div className="feature-content">
                  <h4 className="feature-name">Comprehensive Coverage</h4>
                  <p className="feature-description">
                    Covers multiple aspects of your topic for thorough understanding
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
