import React, { useState, useEffect } from 'react';
import BadgeCollection from '../components/rewards/BadgeCollection';
import LevelUpAnimation from '../components/rewards/LevelUpAnimation';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import { fetchUserAchievements, fetchAvailableAchievements } from '../services/rewardService';
import './RewardsPage.css';

const RewardsPage = () => {
  const [userAchievements, setUserAchievements] = useState(null);
  const [availableAchievements, setAvailableAchievements] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnimation, setShowAnimation] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const userData = await fetchUserAchievements();
        const availableData = await fetchAvailableAchievements();
        
        setUserAchievements(userData);
        setAvailableAchievements(availableData);
        
        // Check if there's a new achievement to celebrate
        const urlParams = new URLSearchParams(window.location.search);
        const newAchievementId = urlParams.get('newAchievement');
        
        if (newAchievementId) {
          const achievement = availableData.find(a => a.id === newAchievementId);
          if (achievement) {
            setNewAchievement(achievement);
            setShowAnimation(true);
          }
        }
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAchievements();
  }, []);
  
  if (loading) {
    return <div className="loading-container">Loading achievements...</div>;
  }
  
  const achievementCategories = [
    { id: 'all', label: 'All Badges' },
    { id: 'quiz', label: 'Quiz Master' },
    { id: 'streak', label: 'Learning Streak' },
    { id: 'community', label: 'Community' },
    { id: 'special', label: 'Special' }
  ];
  
  const filteredAchievements = selectedCategory === 'all' 
    ? availableAchievements 
    : availableAchievements.filter(a => a.category === selectedCategory);
  
  const earnedAchievements = userAchievements.achievements;
  const userLevel = userAchievements.level;
  const nextLevelProgress = userAchievements.nextLevelProgress;
  
  return (
    <div className="rewards-page page-container">
      {showAnimation && newAchievement && (
        <LevelUpAnimation 
          achievement={newAchievement} 
          onClose={() => setShowAnimation(false)} 
        />
      )}
      
      <div className="rewards-header">
        <h1 className="rewards-title">Your Achievements</h1>
        <div className="rewards-summary">
          <div className="rewards-stats">
            <div className="rewards-stat-item">
              <span className="stat-label">Total Badges</span>
              <span className="stat-value">{earnedAchievements.length} / {availableAchievements.length}</span>
            </div>
            <div className="rewards-stat-item">
              <span className="stat-label">Points</span>
              <span className="stat-value">{userAchievements.points}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rewards-level-card">
        <div className="level-info">
          <div className="level-badge">
            <span className="level-number">{userLevel}</span>
          </div>
          <div className="level-details">
            <h3 className="level-title">Level {userLevel} - {userAchievements.levelTitle}</h3>
            <ProgressBar 
              progress={nextLevelProgress} 
              label={`${nextLevelProgress}% to Level ${userLevel + 1}`} 
            />
          </div>
        </div>
      </div>
      
      <div className="rewards-content">
        <div className="rewards-sidebar">
          <Card className="categories-card">
            <h3 className="card-title">Categories</h3>
            <ul className="category-list">
              {achievementCategories.map(category => (
                <li 
                  key={category.id}
                  className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-name">{category.label}</span>
                  <span className="category-count">
                    {category.id === 'all' 
                      ? `${earnedAchievements.length}/${availableAchievements.length}` 
                      : `${earnedAchievements.filter(a => availableAchievements.find(b => b.id === a && availableAchievements.find(b => b.id === a).category === category.id)?.length || 0}/${availableAchievements.filter(a => a.category === category.id).length}`}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="next-achievements-card">
            <h3 className="card-title">Next Achievements</h3>
            <ul className="next-achievement-list">
              {availableAchievements
                .filter(a => !earnedAchievements.includes(a.id))
                .slice(0, 3)
                .map(achievement => (
                  <li key={achievement.id} className="next-achievement-item">
                    <div className="lock-icon">🔒</div>
                    <div className="next-achievement-info">
                      <h4 className="next-achievement-name">{achievement.name}</h4>
                      <p className="next-achievement-desc">{achievement.description}</p>
                      {achievement.progress !== undefined && (
                        <ProgressBar 
                          progress={achievement.progress} 
                          size="small"
                          label={`${achievement.progress}%`} 
                        />
                      )}
                    </div>
                  </li>
                ))
              }
            </ul>
          </Card>
        </div>
        
        <div className="badges-container">
          <BadgeCollection 
            achievements={filteredAchievements} 
            earnedAchievements={earnedAchievements} 
            category={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;