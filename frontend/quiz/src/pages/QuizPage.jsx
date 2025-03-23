import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizCard from '../components/quiz/QuizCard';
import Timer from '../components/quiz/Timer';
import QuizResults from '../components/quiz/QuizResults';
import Button from '../components/common/Button';
import { fetchQuizById, submitQuizResults } from '../services/quizService';
import './QuizPage.css';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizData = await fetchQuizById(quizId);
        setQuiz(quizData);
        setStartTime(Date.now());
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadQuiz();
  }, [quizId]);
  
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
    
    // For instant feedback
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = answerId === currentQuestion.correctAnswerId;
    
    setFeedback({
      show: true,
      isCorrect
    });
    
    // Hide feedback after 1.5 seconds
    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
    }, 1500);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = async () => {
    const endTime = Date.now();
    const totalTime = Math.floor((endTime - startTime) / 1000); // in seconds
    setTimeTaken(totalTime);
    
    try {
      const resultData = await submitQuizResults(quizId, {
        answers: selectedAnswers,
        timeTaken: totalTime
      });
      
      setResults(resultData);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };
  
  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setResults(null);
    setStartTime(Date.now());
  };
  
  const handleExitQuiz = () => {
    navigate('/');
  };
  
  if (loading) {
    return <div className="loading-container">Loading quiz...</div>;
  }
  
  if (quizCompleted && results) {
    return (
      <div className="quiz-page page-container">
        <QuizResults 
          results={results} 
          quiz={quiz} 
          timeTaken={timeTaken} 
          onRetry={handleRetryQuiz}
          onExit={handleExitQuiz}
        />
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="quiz-page page-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz.title}</h1>
        <div className="quiz-meta">
          <span className="quiz-topic">{quiz.topic}</span>
          <span className="quiz-difficulty">{quiz.difficulty}</span>
        </div>
      </div>
      
      <div className="quiz-progress-container">
        <div className="quiz-progress-info">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          {quiz.timeLimit && (
            <Timer 
              timeLimit={quiz.timeLimit} 
              onTimeUp={finishQuiz} 
            />
          )}
        </div>
        <div className="quiz-progress-bar">
          <div 
            className="quiz-progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="quiz-content">
        <QuizCard
          question={currentQuestion}
          selectedAnswerId={selectedAnswers[currentQuestion.id]}
          onSelectAnswer={(answerId) => handleAnswerSelect(currentQuestion.id, answerId)}
          feedback={feedback}
        />
      </div>
      
      <div className="quiz-actions">
        <Button 
          className="quiz-next-btn"
          variant={selectedAnswers[currentQuestion.id] ? "primary" : "disabled"}
          disabled={!selectedAnswers[currentQuestion.id]}
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;