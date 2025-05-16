import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Flame, Medal, Lock } from 'lucide-react';
import Card from '../ui/Card';
import { Achievement } from '../../types';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getAchievementIcon = () => {
    switch (achievement.icon) {
      case 'award':
        return <Award size={28} />;
      case 'trophy':
        return <Trophy size={28} />;
      case 'flame':
        return <Flame size={28} />;
      case 'medal':
        return <Medal size={28} />;
      default:
        return <Award size={28} />;
    }
  };
  
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full flex items-center justify-center
        ${achievement.unlocked 
          ? 'bg-interactive/20 text-interactive' 
          : 'bg-background-lighter/50 text-text-muted'}`
      }>
        <motion.div
          initial={false}
          animate={achievement.unlocked 
            ? { scale: [0.8, 1.2, 1], rotate: [0, 15, 0] } 
            : {}}
          transition={{ duration: 0.5 }}
        >
          {getAchievementIcon()}
        </motion.div>
      </div>
      
      <div className="mt-2">
        <div className="flex items-center">
          <h3 className="text-md font-medium text-text mb-1">
            {achievement.title}
          </h3>
          {!achievement.unlocked && (
            <Lock size={14} className="ml-2 text-text-muted" />
          )}
        </div>
        <p className="text-sm text-text-secondary mb-2">
          {achievement.description}
        </p>
        
        {achievement.unlocked && achievement.date && (
          <p className="text-xs text-text-muted">
            Unlocked on {new Date(achievement.date).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
};

export default AchievementCard;