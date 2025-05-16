import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  ArrowLeft, 
  Trophy,
  Clock,
  Settings,
  Play,
  BarChart 
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { useAppStore } from '../store';
import { Game } from '../types';

const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { games, updateGameProgress, completeGame, unlockAchievement } = useAppStore();
  
  const [game, setGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [timeRemaining, setTimeRemaining] = useState(60);
  
  useEffect(() => {
    if (gameId) {
      const foundGame = games.find(g => g.id === gameId);
      if (foundGame) {
        setGame(foundGame);
        setGameProgress(foundGame.progress);
        setDifficulty(foundGame.difficulty);
      } else {
        navigate('/games');
      }
    }
  }, [gameId, games, navigate]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          // Update progress as time decreases
          const newProgress = Math.min(100, game?.progress || 0 + Math.floor(Math.random() * 5));
          setGameProgress(newProgress);
          
          if (newTime <= 0) {
            handleGameComplete();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeRemaining]);
  
  const startGame = () => {
    setIsPlaying(true);
    setTimeRemaining(difficulty === 'easy' ? 60 : difficulty === 'medium' ? 90 : 120);
  };
  
  const handleGameComplete = () => {
    setIsPlaying(false);
    
    if (game) {
      const finalProgress = Math.min(100, game.progress + Math.floor(Math.random() * 30) + 10);
      updateGameProgress(game.id, finalProgress);
      
      if (finalProgress >= 100) {
        completeGame(game.id);
        unlockAchievement('1'); // First Steps achievement
        
        if (games.filter(g => g.category === 'memory' && g.completed).length === 
            games.filter(g => g.category === 'memory').length) {
          unlockAchievement('2'); // Memory Master achievement
        }
      }
      
      if (finalProgress === 100) {
        unlockAchievement('4'); // Perfect Score achievement
      }
    }
  };
  
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
  };
  
  if (!game) return null;
  
  const getGameIcon = () => {
    switch (game.icon) {
      case 'brain':
        return <Brain size={28} className="text-interactive" />;
      case 'user-check':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interactive">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <polyline points="16 11 18 13 22 9"></polyline>
          </svg>
        );
      case 'puzzle':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interactive">
            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.992.123-1.76.872-1.88 1.864-.11.897.25 1.084.25 1.084h-4.5s.36-.188.25-1.084c-.12-.992-.888-1.74-1.88-1.864-.166.446-.497.855-.968.925a.98.98 0 0 1-.837-.276L5.707 14.704C5.236 14.233 5 13.617 5 13s.235-1.233.706-1.704l1.568-1.568a1.05 1.05 0 0 0 .29-.878c-.128-1.036-.879-1.973-1.945-2.106-.961-.12-1.493.5-1.493.5v-4.5s.532.62 1.493.5c1.066-.133 1.816-1.07 1.945-2.106.049-.322-.059-.648-.29-.878l-.301-.301a2.41 2.41 0 0 1 0-3.406c.451-.451 1.05-.698 1.687-.697h.033c.586.004 1.143.229 1.56.625l.134.133c.23.23.556.338.878.29 1.036-.128 1.973-.879 2.106-1.945.12-.961-.5-1.493-.5-1.493h4.5s-.62.532-.5 1.493c.133 1.066 1.07 1.817 2.106 1.945.322.049.648-.059.878-.29l.134-.133c.417-.396.974-.621 1.559-.625h.034c.637-.001 1.236.246 1.687.697a2.41 2.41 0 0 1 0 3.406l-.3.301a1.05 1.05 0 0 0-.29.878c.127 1.036.878 1.973 1.944 2.106.961.12 1.493-.5 1.493-.5v4.5s-.532-.62-1.493-.5c-1.066.133-1.816 1.07-1.944 2.106z"></path>
          </svg>
        );
      case 'book-open':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interactive">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
      default:
        return <Brain size={28} className="text-interactive" />;
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<ArrowLeft size={18} />}
                  onClick={() => navigate('/games')}
                  className="mr-4"
                >
                  Back to Games
                </Button>
                <div className="h-12 w-12 rounded-lg bg-interactive/20 flex items-center justify-center mr-4">
                  {getGameIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-text">
                    {game.title}
                  </h1>
                  <p className="text-text-secondary">
                    {game.description}
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <Badge variant={
                  difficulty === 'easy' ? 'primary' : 
                  difficulty === 'medium' ? 'secondary' : 'accent'
                }>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
                </Badge>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main game area */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full">
                {isPlaying ? (
                  <div className="flex flex-col h-full">
                    {/* Game header */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-text">{game.title}</h3>
                        <p className="text-sm text-text-secondary">
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock size={18} className="text-interactive mr-2" />
                          <span className="text-text font-medium">{timeRemaining}s</span>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPlaying(false)}
                        >
                          Exit
                        </Button>
                      </div>
                    </div>
                    
                    {/* Game content - Would be replaced with actual game UI */}
                    <div className="flex-1 flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="mb-4">
                          <div className="relative inline-block">
                            <div className="absolute -inset-4 rounded-full blur-lg opacity-30 bg-interactive animate-pulse" />
                            <div className="relative z-10 text-5xl">🧠</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-medium text-text mb-2">Playing Game Demo</h3>
                        <p className="text-text-secondary mb-6">
                          This is a simulated game environment. In a real implementation, 
                          this would be the interactive game content.
                        </p>
                        <Button
                          variant="primary"
                          onClick={handleGameComplete}
                        >
                          Complete Game
                        </Button>
                      </div>
                    </div>
                    
                    {/* Game progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Progress</span>
                        <span className="text-sm text-text">{gameProgress}%</span>
                      </div>
                      <ProgressBar progress={gameProgress} size="md" variant="accent" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    {/* Game preview */}
                    <div className="relative overflow-hidden rounded-lg bg-primary-dark h-64 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm" />
                      <div className="relative z-10 text-center p-6">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex justify-center mb-4"
                        >
                          <div className="relative">
                            <div className="absolute -inset-4 rounded-full blur-xl opacity-40 bg-interactive animate-pulse" />
                            <div className="relative z-10 p-6 rounded-full bg-primary-light/50 backdrop-blur-md">
                              {getGameIcon()}
                            </div>
                          </div>
                        </motion.div>
                        
                        <h2 className="text-2xl font-display font-bold text-text mb-2">
                          {game.title}
                        </h2>
                        <p className="text-text-secondary mb-6 max-w-md mx-auto">
                          {game.description}
                        </p>
                        
                        <Button
                          variant="accent"
                          size="lg"
                          onClick={startGame}
                          icon={<Play size={20} />}
                        >
                          Start Game
                        </Button>
                      </div>
                    </div>
                    
                    {/* Difficulty selector */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-text mb-3 flex items-center">
                        <Settings size={18} className="mr-2 text-interactive" />
                        Difficulty Settings
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => changeDifficulty('easy')}
                          className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                            difficulty === 'easy' 
                              ? 'bg-interactive text-text shadow-glow-purple' 
                              : 'bg-background-lighter hover:bg-interactive/20 text-text-secondary'
                          }`}
                        >
                          <div className="text-xl mb-1">🌱</div>
                          <p className="font-medium">Easy</p>
                          <p className="text-xs mt-1">60 seconds</p>
                        </button>
                        
                        <button
                          onClick={() => changeDifficulty('medium')}
                          className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                            difficulty === 'medium' 
                              ? 'bg-interactive text-text shadow-glow-purple' 
                              : 'bg-background-lighter hover:bg-interactive/20 text-text-secondary'
                          }`}
                        >
                          <div className="text-xl mb-1">🌿</div>
                          <p className="font-medium">Medium</p>
                          <p className="text-xs mt-1">90 seconds</p>
                        </button>
                        
                        <button
                          onClick={() => changeDifficulty('hard')}
                          className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                            difficulty === 'hard' 
                              ? 'bg-interactive text-text shadow-glow-purple' 
                              : 'bg-background-lighter hover:bg-interactive/20 text-text-secondary'
                          }`}
                        >
                          <div className="text-xl mb-1">🌳</div>
                          <p className="font-medium">Hard</p>
                          <p className="text-xs mt-1">120 seconds</p>
                        </button>
                      </div>
                    </div>
                    
                    {/* Game stats */}
                    <div>
                      <h3 className="text-lg font-medium text-text mb-3 flex items-center">
                        <BarChart size={18} className="mr-2 text-interactive" />
                        Your Progress
                      </h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-background-lighter p-3 rounded-lg">
                          <p className="text-text-secondary text-sm mb-1">Best Score</p>
                          <p className="text-xl font-medium text-text">
                            {game.progress}%
                          </p>
                        </div>
                        
                        <div className="bg-background-lighter p-3 rounded-lg">
                          <p className="text-text-secondary text-sm mb-1">Games Played</p>
                          <p className="text-xl font-medium text-text">
                            {Math.floor(Math.random() * 10) + 1}
                          </p>
                        </div>
                        
                        <div className="bg-background-lighter p-3 rounded-lg">
                          <p className="text-text-secondary text-sm mb-1">Status</p>
                          <p className="text-xl font-medium text-text">
                            {game.completed ? 'Completed' : 'In Progress'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {/* Game benefits */}
              <Card>
                <h3 className="text-lg font-medium text-text mb-3">Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-interactive/20 text-interactive mr-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text">Improves Recognition</h4>
                      <p className="text-sm text-text-secondary">
                        Enhances ability to recognize familiar faces
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-interactive/20 text-interactive mr-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text">Strengthens Memory</h4>
                      <p className="text-sm text-text-secondary">
                        Builds neural pathways for better recall
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-interactive/20 text-interactive mr-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text">Builds Focus</h4>
                      <p className="text-sm text-text-secondary">
                        Increases attention span and concentration
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Related games */}
              <div>
                <h3 className="text-lg font-medium text-text mb-3">Similar Games</h3>
                <div className="space-y-3">
                  {games
                    .filter(g => g.id !== game.id)
                    .slice(0, 2)
                    .map(relatedGame => (
                      <Card
                        key={relatedGame.id}
                        interactive
                        onClick={() => navigate(`/games/${relatedGame.id}`)}
                        className="flex items-center p-4"
                      >
                        <div className="mr-3 p-2 rounded-lg bg-background-lighter">
                          <div className="text-interactive">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text">{relatedGame.title}</h4>
                          <div className="flex items-center text-xs text-text-muted mt-1">
                            <span className="capitalize">{relatedGame.difficulty}</span>
                            <span className="mx-2">•</span>
                            <span>{relatedGame.completed ? 'Completed' : 'Not Completed'}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
              
              {/* Tips */}
              <Card>
                <h3 className="text-lg font-medium text-text mb-3 flex items-center">
                  <Trophy size={18} className="mr-2 text-interactive" />
                  Tips for Success
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <div className="text-interactive mr-2">•</div>
                    Focus on distinctive facial features
                  </li>
                  <li className="flex items-start">
                    <div className="text-interactive mr-2">•</div>
                    Create mental associations
                  </li>
                  <li className="flex items-start">
                    <div className="text-interactive mr-2">•</div>
                    Practice regularly for best results
                  </li>
                  <li className="flex items-start">
                    <div className="text-interactive mr-2">•</div>
                    Take breaks if you feel frustrated
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GameDetail;