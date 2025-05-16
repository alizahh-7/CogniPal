import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, ArrowLeft, Play, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

interface Word {
  id: number;
  text: string;
}

const generateWords = (count: number): Word[] => {
  const wordList = [
    'Apple', 'Book', 'Cat', 'Dog', 'Elephant', 'Fish',
    'Garden', 'House', 'Ice', 'Jacket', 'King', 'Lamp',
    'Moon', 'Nest', 'Ocean', 'Piano', 'Queen', 'Rainbow',
    'Sun', 'Tree', 'Umbrella', 'Violin', 'Water', 'Xylophone',
    'Yellow', 'Zebra'
  ];
  
  return wordList
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((text, id) => ({ id, text }));
};

const MemoryRecall: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'memorize' | 'recall' | 'complete'>('start');
  const [words, setWords] = useState<Word[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  
  const difficultySettings = {
    easy: { words: 5, memorizeTime: 10 },
    medium: { words: 8, memorizeTime: 15 },
    hard: { words: 12, memorizeTime: 20 },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'memorize') {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setGameState('recall');
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
    setWords(generateWords(settings.words));
    setTimer(settings.memorizeTime);
    setScore(0);
    setCurrentWordIndex(0);
    setGameState('memorize');
  };

  const handleRecall = () => {
    const isCorrect = userInput.toLowerCase() === words[currentWordIndex].text.toLowerCase();
    if (isCorrect) setScore(prev => prev + 1);
    
    if (currentWordIndex === words.length - 1) {
      setGameState('complete');
    } else {
      setCurrentWordIndex(prev => prev + 1);
    }
    
    setUserInput('');
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
                  Memory Recall
                </h1>
                <p className="text-text-secondary mb-8">
                  Memorize the words shown and recall them in order. Test your memory capacity!
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
                          {difficultySettings[level].words} words
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

          {gameState === 'memorize' && (
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
                <div className="flex items-center text-text-secondary">
                  <Timer size={18} className="mr-2" />
                  <span>{timer}s</span>
                </div>
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-medium text-text mb-4">
                  Memorize these words
                </h2>
                <div className="grid gap-4 mb-8">
                  {words.map((word, index) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background-lighter p-4 rounded-lg text-text text-lg"
                    >
                      {word.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {gameState === 'recall' && (
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
                <div className="text-text-secondary">
                  Word {currentWordIndex + 1} of {words.length}
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-text mb-2">
                  Recall the words in order
                </h2>
                <p className="text-text-secondary">
                  Enter word #{currentWordIndex + 1}
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type the word..."
                  onKeyDown={(e) => e.key === 'Enter' && handleRecall()}
                />
                
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleRecall}
                >
                  Submit
                </Button>
              </div>
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
                  {score === words.length ? '🎉' : '👏'}
                </div>
                <h2 className="text-2xl font-display font-bold text-text mb-2">
                  Game Complete!
                </h2>
                <p className="text-text-secondary mb-6">
                  You recalled {score} out of {words.length} words correctly!
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {words.map((word, index) => (
                      <div
                        key={word.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-background-lighter"
                      >
                        <span className="text-text">{word.text}</span>
                        {index < score ? (
                          <Check size={18} className="text-interactive" />
                        ) : (
                          <X size={18} className="text-error" />
                        )}
                      </div>
                    ))}
                  </div>
                  
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

export default MemoryRecall;