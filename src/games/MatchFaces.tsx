import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Trophy, Timer, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const faces = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=face1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=face2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=face3',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=face4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=face5',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=face6',
];

const MatchFaces: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted]);

  const initializeGame = () => {
    const duplicatedFaces = [...faces, ...faces];
    const shuffledCards = duplicatedFaces
      .sort(() => Math.random() - 0.5)
      .map((face, index) => ({
        id: index,
        imageUrl: face,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setGameStarted(true);
    setGameCompleted(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted || gameCompleted) return;
    
    if (flippedCards.length === 2) return;
    
    if (cards[cardId].isMatched || cards[cardId].isFlipped) return;
    
    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    
    setFlippedCards(prev => [...prev, cardId]);
    
    if (flippedCards.length === 1) {
      setMoves(prev => prev + 1);
      
      const [firstCard] = flippedCards;
      if (cards[firstCard].imageUrl === cards[cardId].imageUrl) {
        // Match found
        newCards[firstCard].isMatched = true;
        newCards[cardId].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatchedPairs(prev => {
          const newPairs = prev + 1;
          if (newPairs === faces.length) {
            setGameCompleted(true);
          }
          return newPairs;
        });
      } else {
        // No match
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[cardId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!gameStarted ? (
            <Card className="text-center p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-display font-bold text-text mb-4">
                  Match Faces
                </h1>
                <p className="text-text-secondary mb-8">
                  Test your memory by matching pairs of faces. Find all pairs to complete the game!
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={initializeGame}
                  icon={<Shuffle size={20} />}
                >
                  Start Game
                </Button>
              </motion.div>
            </Card>
          ) : gameCompleted ? (
            <Card className="text-center p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-display font-bold text-text mb-2">
                  Congratulations!
                </h2>
                <p className="text-text-secondary mb-4">
                  You completed the game in {moves} moves and {timer} seconds!
                </p>
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    onClick={initializeGame}
                    icon={<Shuffle size={18} />}
                  >
                    Play Again
                  </Button>
                </div>
              </motion.div>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGameStarted(false)}
                    icon={<ArrowLeft size={18} />}
                  >
                    Exit
                  </Button>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Timer size={18} />
                    <span>{timer}s</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Trophy size={18} />
                    <span>{matchedPairs} / {faces.length}</span>
                  </div>
                  <div className="text-text-secondary">
                    Moves: {moves}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence>
                  {cards.map(card => (
                    <motion.div
                      key={card.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCardClick(card.id)}
                      className={`
                        aspect-square rounded-xl cursor-pointer
                        ${card.isFlipped || card.isMatched ? 'bg-interactive/20' : 'bg-background-lighter'}
                        transition-colors duration-300
                        ${card.isMatched ? 'shadow-glow-purple' : ''}
                      `}
                    >
                      <div className="relative w-full h-full">
                        <div
                          className={`
                            absolute inset-0 rounded-xl
                            ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}
                            transition-opacity duration-300
                            flex items-center justify-center
                          `}
                        >
                          <img
                            src={card.imageUrl}
                            alt="Avatar"
                            className="w-full h-full p-4"
                          />
                        </div>
                        {!card.isFlipped && !card.isMatched && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-interactive/30 flex items-center justify-center">
                              <span role="img" aria-label="brain" className="text-2xl">
                                🧠
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchFaces;