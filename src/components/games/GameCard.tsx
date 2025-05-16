import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  UserCheck, 
  Puzzle, 
  BookOpen,
  LockIcon,
  BarChart 
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  disabled?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, disabled = false }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!disabled) {
      const gameRoutes: Record<string, string> = {
        'Match Faces': '/games/match-faces',
        'Memory Recall': '/games/memory-recall',
        'Pattern Puzzle': '/games/pattern-puzzle',
        'Story Recall': '/games/story-recall'
      };
      
      navigate(gameRoutes[game.title]);
    }
  };
  
  const getGameIcon = () => {
    switch (game.icon) {
      case 'brain':
        return <Brain size={24} className="text-interactive" />;
      case 'user-check':
        return <UserCheck size={24} className="text-interactive" />;
      case 'puzzle':
        return <Puzzle size={24} className="text-interactive" />;
      case 'book-open':
        return <BookOpen size={24} className="text-interactive" />;
      default:
        return <Brain size={24} className="text-interactive" />;
    }
  };
  
  const getDifficultyColor = () => {
    switch (game.difficulty) {
      case 'easy':
        return 'primary';
      case 'medium':
        return 'secondary';
      case 'hard':
        return 'accent';
      default:
        return 'default';
    }
  };
  
  return (
    <Card 
      interactive={!disabled} 
      onClick={handleClick}
      className="relative overflow-hidden h-full"
    >
      {disabled && (
        <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm flex items-center justify-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <LockIcon size={32} className="text-text-muted" />
          </motion.div>
        </div>
      )}
      
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-primary/30">
            {getGameIcon()}
          </div>
          <Badge variant={getDifficultyColor() as any}>
            {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
          </Badge>
        </div>
        
        <h3 className="text-lg font-medium text-text mb-2">{game.title}</h3>
        <p className="text-sm text-text-secondary mb-4">{game.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Progress</span>
            <div className="flex items-center text-xs text-text-secondary">
              <BarChart size={12} className="mr-1" />
              {game.progress}%
            </div>
          </div>
          <ProgressBar progress={game.progress} size="sm" showValue={false} />
        </div>
      </div>
    </Card>
  );
};

export default GameCard;