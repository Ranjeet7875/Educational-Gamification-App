import React from 'react';
import './QuizCard.css';

const QuizCard = ({ question, selectedAnswerId, onSelectAnswer, feedback }) => {
  const handleAnswerClick = (answerId) => {
    if (!selectedAnswerId) {
      onSelectAnswer(answerId);
    }
  };

  return (
    <div className="quiz-card">
      <div className="question-container">
        <h2 className="question-text">{question.text}</h2>
        {question.image && (
          <div className="question-image-container">
            <img src={question.image} alt="Question" className="question-image" />
          </div>
        )}
      </div>

      <div className="answers-container">
        {question.answers.map(answer => (
          <div
            key={answer.id}
            className={`answer-option ${selectedAnswerId === answer.id ? 'selected' : ''} 
                      ${feedback.show && selectedAnswerId === answer.id 
                        ? (feedback.isCorrect ? 'correct' : 'incorrect') 
                        : ''}`}
            onClick={() => handleAnswerClick(answer.id)}
          >
            <div className="answer-marker">{String.fromCharCode(65 + question.answers.indexOf(answer))}</div>
            <div className="answer-text">{answer.text}</div>
            {feedback.show && selectedAnswerId === answer.id && (
              <div className="feedback-icon">
                {feedback.isCorrect ? '✓' : '✗'}
              </div>
            )}
          </div>
        ))}
      </div>

      {feedback.show && (
        <div className={`feedback-message ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          {feedback.isCorrect 
            ? 'Correct! Well done!' 
            : `Incorrect. ${question.explanation || ''}`}
        </div>
      )}
    </div>
  );
};

export default QuizCard;