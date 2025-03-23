import React from 'react';
import Badge from '../common/Badge';
import './BadgeCollection.css';

const BadgeCollection = ({ achievements, earnedAchievements, category }) => {
  const categoryTitle = {
    'all': 'All Badges',
    'quiz': 'Quiz Master Badges',
    'streak': 'Learning Streak Badges',
    'community': 'Community Badges',
    'special': 'Special Badges'
  };

  return (
    <div className="badge-collection">
      <h2 className="collection-title">{categoryTitle[category] || 'Badges'}</h2>
      <div className="badges-grid">
        {achievements.map(achievement => {
          const isEarned = earnedAchievements.includes(achievement.id);
          return (
            <Badge
              key={achievement.id}
              achievement={achievement}
              isEarned={isEarned}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BadgeCollection;