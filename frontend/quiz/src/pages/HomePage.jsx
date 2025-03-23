import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WelcomeBanner from '../components/home/WelcomeBanner';
import QuizRecommendations from '../components/home/QuizRecommendations';
import ProfileSummary from '../components/home/ProfileSummary';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { fetchUserData, fetchRecommendedQuizzes, fetchTrendingQuizzes } from '../services/userService';
import './HomePage.css';

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [recommendedQuizzes, setRecommendedQuizzes] = useState([]);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomePageData = async () => {
      try {
        const user = await fetchUserData();
        const recommended = await fetchRecommendedQuizzes(user.id);
        const trending = await fetchTrendingQuizzes();
        
        setUserData(user);
        setRecommendedQuizzes(recommended);
        setTrendingQuizzes(trending);
      } catch (error) {
        console.error('Error loading home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomePageData();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="home-page page-container">
      <WelcomeBanner user={userData} />
      
      <section className="quick-access-section section-container">
        <h2 className="section-title">Quick Access</h2>
        <div className="quick-access-buttons">
          <Link to="/quiz/featured">
            <Button className="quick-access-button" variant="primary">
              <i className="icon-quiz"></i>
              Featured Quizzes
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button className="quick-access-button" variant="secondary">
              <i className="icon-leaderboard"></i>
              Leaderboard
            </Button>
          </Link>
          <Link to="/rewards">
            <Button className="quick-access-button" variant="accent">
              <i className="icon-rewards"></i>
              Achievements
            </Button>
          </Link>
          <Link to="/progress">
            <Button className="quick-access-button" variant="neutral">
              <i className="icon-progress"></i>
              My Progress
            </Button>
          </Link>
        </div>
      </section>
      
      <div className="home-content-layout">
        <section className="personalized-section section-container">
          <div className="flex-between">
            <h2 className="section-title">Recommended For You</h2>
            <Link to="/quiz/all" className="view-all-link">View All</Link>
          </div>
          <QuizRecommendations quizzes={recommendedQuizzes} />
        </section>
        
        <div className="home-sidebar">
          <ProfileSummary user={userData} />
          
          <Card className="trending-card">
            <h3 className="card-title">Trending Now</h3>
            <ul className="trending-list">
              {trendingQuizzes.map(quiz => (
                <li key={quiz.id} className="trending-item">
                  <Link to={`/quiz/${quiz.id}`} className="trending-link">
                    <span className="trending-title">{quiz.title}</span>
                    <span className="trending-participants">{quiz.participants} participants</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="upcoming-challenge-card">
            <h3 className="card-title">Upcoming Challenges</h3>
            <div className="challenge-item">
              <div className="challenge-header">
                <h4>Science Bowl</h4>
                <span className="challenge-date">Tomorrow</span>
              </div>
              <p className="challenge-description">
                Test your knowledge in physics, chemistry and biology!
              </p>
              <Button className="challenge-remind-btn" variant="outline">Remind Me</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;