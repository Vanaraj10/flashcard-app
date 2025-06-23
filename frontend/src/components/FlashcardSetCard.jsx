import { Link } from 'react-router-dom';
import './FlashcardSetCard.css';

const FlashcardSetCard = ({ set, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCardIcon = (index) => {
    const icons = ['📚', '🧠', '⚡', '🎯', '🔬', '💡', '🌟', '🚀'];
    return icons[index % icons.length];
  };

  const getGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Link 
      to={`/set/${index}`} 
      className="flashcard-set-card"
      state={{ set, index }}
    >
      <div className="card-header" style={{ background: getGradient(index) }}>
        <div className="card-icon">{getCardIcon(index)}</div>
        <div className="card-stats">
          <span className="card-count">{set.flashcards.length}</span>
          <span className="card-count-label">cards</span>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{set.topic}</h3>
        <div className="card-meta">
          <div className="card-date">
            <span className="meta-icon">📅</span>
            Created {formatDate(set.created_at)}
          </div>
          <div className="card-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.random() * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {Math.floor(Math.random() * 100)}% complete
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button className="study-btn">
          <span>Study Now</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </Link>
  );
};

export default FlashcardSetCard;
