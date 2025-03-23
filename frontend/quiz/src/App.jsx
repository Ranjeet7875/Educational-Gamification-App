import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import RewardsPage from './pages/RewardsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProgressPage from './pages/ProgressPage';
import './App.css';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/progress" element={<ProgressPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;