import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowLeft, Play, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

type Shape = 'circle' | 'square' | 'triangle' | 'star';
type Color = 'interactive' | 'accent' | 'highlight' | 'primary';

interface PatternItem {
  shape: Shape;
  color: Color;
}

const shapes: Shape[] = ['circle', 'square', 'triangle', 'star'];
const colors: Color[] = ['interactive', 'accent', 'highlight', 'primary'];

const generatePattern = (length: number): PatternItem[] => {
  const pattern: PatternItem[] = [];
  for (let i = 0; i < length; i++) {
    pattern.push({
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return pattern;
};

const ShapeComponent: React.FC<{ shape: Shape; color: Color; onClick?: () => void }> = ({ 
  shape, 
  color,
  onClick 
}) => {
  const baseClasses = `
    w-16 h-16 flex items-center justify-center
    ${onClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
  `;
  
  const getShapeClasses = () => {
    const colorClasses = {
      interactive: 'bg-interactive/30 border-interactive',
      accent: 'bg-accent/30 border-accent',
      highlight: 'bg-highlight/30 border-highlight',
      primary: 'bg-primary/30 border-primary',
    }[color];
    
    switch (shape) {
      case 'circle':
        return `${baseClasses} ${colorClasses} rounded-full border-2`;
      case 'square':
        return `${baseClasses} ${colorClasses} rounded-lg border-2`;
      case 'triangle':
        return `${baseClasses} ${colorClasses} clip-triangle border-2`;
      case 'star':
        return `${baseClasses} ${colorClasses} clip-star border-2`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={getShapeClasses()} onClick={onClick}>
      {shape === 'star' && '⭐️'}
    </div>
  );
};

const PatternPuzzle: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'watch' | 'solve' | 'complete'>('start');
  const [pattern, setPattern] = useState<PatternItem[]>([]);
  const [userPattern, setUserPattern] = useState<PatternItem[]>([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const difficultySettings = {
    easy: { initialLength: 3, watchTime: 5 },
    medium: { initialLength: 4, watchTime: 4 },
    hard: { initialLength: 5, watchTime: 3 },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'watch') {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setGameState('solve');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = () => {
    const settings = difficultySettings[difficulty];
    const newPattern = generatePattern(settings.initialLength);
    setPattern(newPattern);
    setUserPattern([]);
    setTimer(settings.watchTime);
    setScore(0);
    setLevel(1);
    setGameState('watch');
  };

  const handleShapeClick = (shape: Shape, color: Color) => {
    if (gameState !== 'solve') return;
    
    const newUserPattern = [...userPattern, { shape, color }];
    setUserPattern(newUserPattern);
    
    if (newUserPattern.length === pattern.length) {
      const isCorrect = newUserPattern.every((item, index) => 
        item.shape === pattern[index].shape && item.color === pattern[index].color
      );
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        const newPattern = generatePattern(pattern.length + 1);
        setPattern(newPattern);
        setUserPattern([]);
        setTimer(difficultySettings[difficulty].watchTime);
        setLevel(prev => prev + 1);
        setGameState('watch');
      } else {
        setGameState('complete');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {gameState === 'start' && (
            <Card className="text-center p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-display font-bold text-text mb-4">
                  Pattern Puzzle
                </h1>
                <p className="text-text-secondary mb-8">
                  Watch the pattern of shapes and colors, then recreate it from memory!
                </p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-text mb-3">Select Difficulty</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(['easy', 'medium', 'hard'] as const).map(level => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`
                          p-3 rounded-lg text-center transition-colors duration-200
                          ${difficulty === level 
                            ? 'bg-interactive text-text shadow-glow-purple' 
                            : 'bg-background-lighter hover:bg-interactive/20 text-text-secondary'
                          }
                        `}
                      >
                        <p className="font-medium capitalize">{level}</p>
                        <p className="text-xs mt-1">
                          {difficultySettings[level].initialLength} shapes
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={startGame}
                  icon={<Play size={20} />}
                >
                  Start Game
                </Button>
              </motion.div>
            </Card>
          )}

          {(gameState === 'watch' || gameState === 'solve') && (
            <Card>
              <div className="flex justify-between items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGameState('start')}
                  icon={<ArrowLeft size={18} />}
                >
                  Exit
                </Button>
                <div className="flex items-center space-x-4">
                  <div className="text-text-secondary">
                    Level {level}
                  </div>
                  {gameState === 'watch' && (
                    <div className="flex items-center text-text-secondary">
                      <Timer size={18} className="mr-2" />
                      <span>{timer}s</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-text mb-2">
                  {gameState === 'watch' ? 'Remember this pattern' : 'Recreate the pattern'}
                </h2>
                <p className="text-text-secondary">
                  {gameState === 'watch' 
                    ? 'The pattern will disappear soon...' 
                    : 'Click the shapes in the correct order'}
                </p>
              </div>
              
              {/* Pattern display */}
              <div className="flex justify-center mb-8">
                <div className="grid grid-flow-col gap-4">
                  <AnimatePresence>
                    {(gameState === 'watch' ? pattern : userPattern).map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ShapeComponent shape={item.shape} color={item.color} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Shape selector */}
              {gameState === 'solve' && (
                <div className="grid grid-cols-2 gap-4">
                  {shapes.map(shape => (
                    <div key={shape} className="bg-background-lighter p-4 rounded-lg">
                      <div className="grid grid-cols-4 gap-2">
                        {colors.map(color => (
                          <ShapeComponent
                            key={`${shape}-${color}`}
                            shape={shape}
                            color={color}
                            onClick={() => handleShapeClick(shape, color)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {gameState === 'complete' && (
            <Card className="text-center p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-4">
                  {score > 0 ? '🎉' : '👏'}
                </div>
                <h2 className="text-2xl font-display font-bold text-text mb-2">
                  Game Over!
                </h2>
                <p className="text-text-secondary mb-6">
                  You completed {score} {score === 1 ? 'level' : 'levels'}!
                </p>
                
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="primary"
                    onClick={startGame}
                    icon={<Play size={18} />}
                  >
                    Play Again
                  </Button>
                </div>
              </motion.div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternPuzzle;