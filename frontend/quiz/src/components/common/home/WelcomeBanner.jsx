import React, { useState, useEffect } from 'react';
import './WelcomeBanner.css';

const motivationalQuotes = [
  "Learning is a journey, not a destination.",
  "Knowledge is power, and quizzes make it fun!",
  "Challenge yourself today to be smarter tomorrow.",
  "Every quiz brings you one step closer to mastery.",
  "Turn learning into a game, and watch yourself grow."
];

const WelcomeBanner = ({ user }) => {
  const [quote, setQuote] = useState('');
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
    
    // Change quote every 12 seconds
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[newIndex]);
    }, 12000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h1 className="welcome-title">
          {getTimeBasedGreeting()}, {user?.name || 'Learner'}!
        </h1>
        <p className="welcome-message">
          {quote}
        </p>
        <div className="banner-cta">
          <button className="banner-button primary">Take a Quiz</button>
          <button className="banner-button secondary">Resume Learning</button>
        </div>
      </div>
      
      <div className="welcome-decoration">
        <div className="animated-element element-1"></div>
        <div className="animated-element element-2"></div>
        <div className="animated-element element-3"></div>
      </div>
    </div>
  );
};

export default WelcomeBanner;