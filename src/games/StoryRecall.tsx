import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ArrowLeft, Play, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Story {
  title: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const stories: Story[] = [
  {
    title: "The Friendly Garden",
    content: `In a small garden behind an old house lived a family of rabbits. Every morning, they would hop around looking for fresh vegetables to eat. The garden had carrots, lettuce, and tomatoes growing in neat rows.

One day, a young rabbit named Max discovered a new vegetable patch. It had the biggest, orangest carrots he had ever seen! He was so excited that he called his whole family to share his discovery.

The family worked together to harvest the vegetables, making sure to leave enough for tomorrow. They even planted new seeds to help the garden grow. From that day on, the rabbits took special care of their garden, and it became the most beautiful one in the neighborhood.`,
    questions: [
      {
        question: "What was the name of the young rabbit?",
        options: ["Jack", "Max", "Tom", "Sam"],
        correctAnswer: 1
      },
      {
        question: "What did the rabbits do after finding the vegetables?",
        options: [
          "Ate all the vegetables",
          "Left the garden",
          "Planted new seeds",
          "Built a fence"
        ],
        correctAnswer: 2
      },
      {
        question: "What vegetables were growing in the garden?",
        options: [
          "Potatoes, onions, and corn",
          "Carrots, lettuce, and tomatoes",
          "Beans, peas, and cucumbers",
          "Broccoli, spinach, and peppers"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    title: "The Magic Library",
    content: `Sarah loved visiting the old library on Oak Street. It wasn't just any library - the books seemed to glow with a soft light when you touched them. Each time she opened a book, the stories would come alive in her imagination.

One rainy Tuesday, Sarah found a special book with a golden cover. When she opened it, sparkles flew from the pages! The librarian, Ms. Rose, smiled and told her it was a magical book that showed different stories to different readers.

Sarah spent hours reading the golden book, discovering adventures that seemed written just for her. From that day on, she visited the library every Tuesday, eager to find more magical books and share them with her friends.`,
    questions: [
      {
        question: "What was special about the books in the library?",
        options: [
          "They were very old",
          "They glowed when touched",
          "They were all golden",
          "They were very large"
        ],
        correctAnswer: 1
      },
      {
        question: "What was the librarian's name?",
        options: [
          "Ms. Rose",
          "Ms. Smith",
          "Ms. Jones",
          "Ms. Brown"
        ],
        correctAnswer: 0
      },
      {
        question: "On which day did Sarah find the golden book?",
        options: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Friday"
        ],
        correctAnswer: 1
      }
    ]
  }
];

const StoryRecall: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'read' | 'quiz' | 'complete'>('start');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [readingTime, setReadingTime] = useState(60);

  const startGame = () => {
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    setCurrentStory(randomStory);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setGameState('read');
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === currentStory!.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex === currentStory!.questions.length - 1) {
      setGameState('complete');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
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
                  Story & Recall
                </h1>
                <p className="text-text-secondary mb-8">
                  Read a short story and answer questions about it. Test your comprehension and memory!
                </p>
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

          {gameState === 'read' && currentStory && (
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
                <div className="flex items-center">
                  <Book size={18} className="text-interactive mr-2" />
                  <span className="text-text-secondary">Reading Time</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-text mb-4">
                  {currentStory.title}
                </h2>
                <div className="prose prose-invert">
                  <p className="text-text-secondary whitespace-pre-line">
                    {currentStory.content}
                  </p>
                </div>
              </div>
              
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setGameState('quiz')}
              >
                I'm Ready for Questions
              </Button>
            </Card>
          )}

          {gameState === 'quiz' && currentStory && (
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
                  Question {currentQuestionIndex + 1} of {currentStory.questions.length}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-text mb-4">
                  {currentStory.questions[currentQuestionIndex].question}
                </h3>
                
                <div className="space-y-3">
                  {currentStory.questions[currentQuestionIndex].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index)}
                      className="w-full p-4 rounded-lg bg-background-lighter hover:bg-interactive/20 text-left transition-colors duration-200"
                    >
                      <span className="text-text">{option}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {gameState === 'complete' && currentStory && (
            <Card className="text-center p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-4">
                  {score === currentStory.questions.length ? '🎉' : '👏'}
                </div>
                <h2 className="text-2xl font-display font-bold text-text mb-2">
                  Story Complete!
                </h2>
                <p className="text-text-secondary mb-6">
                  You got {score} out of {currentStory.questions.length} questions correct!
                </p>
                
                <div className="space-y-4 mb-6">
                  {currentStory.questions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-left bg-background-lighter p-4 rounded-lg"
                    >
                      <div className="mt-1">
                        {answers[index] === question.correctAnswer ? (
                          <Check size={18} className="text-interactive" />
                        ) : (
                          <X size={18} className="text-error" />
                        )}
                      </div>
                      <div>
                        <p className="text-text font-medium mb-1">{question.question}</p>
                        <p className="text-text-secondary text-sm">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                        {answers[index] !== question.correctAnswer && (
                          <p className="text-error text-sm">
                            Your answer: {question.options[answers[index]]}
                          </p>
                        )}
                      </div>
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
              </motion.div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryRecall;