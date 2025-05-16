import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Brain, Trophy } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import GameCard from '../components/games/GameCard';
import AchievementCard from '../components/achievements/AchievementCard';
import { useAppStore } from '../store';

const GamesHub: React.FC = () => {
  const { games, achievements, user } = useAppStore();
  
  // Filter for unlocked achievements
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
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
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-interactive/20 flex items-center justify-center">
                <Brain size={24} className="text-interactive" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-text">
                  Games Hub
                </h1>
                <p className="text-text-secondary">
                  Train your memory with fun, interactive games
                </p>
              </div>
            </div>
            
            <Card>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search games..."
                    icon={<Search size={18} />}
                  />
                </div>
                <Button
                  variant="outline"
                  icon={<Filter size={18} />}
                >
                  Filter
                </Button>
              </div>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - Games */}
            <motion.div 
              className="lg:col-span-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item} className="mb-6">
                <h2 className="text-xl font-display font-semibold text-text flex items-center mb-4">
                  <Brain size={20} className="text-interactive mr-2" />
                  Memory Training Games
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {games.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </motion.div>
              
              {/* Game categories */}
              <motion.div variants={item}>
                <h3 className="text-lg font-medium text-text mb-4">
                  Game Categories
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Card className="text-center py-4">
                    <div className="h-12 w-12 mx-auto rounded-full bg-interactive/20 flex items-center justify-center mb-2">
                      <Brain size={24} className="text-interactive" />
                    </div>
                    <h4 className="text-text font-medium">Memory</h4>
                    <p className="text-xs text-text-muted">4 games</p>
                  </Card>
                  
                  <Card className="text-center py-4">
                    <div className="h-12 w-12 mx-auto rounded-full bg-highlight/20 flex items-center justify-center mb-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <h4 className="text-text font-medium">Recall</h4>
                    <p className="text-xs text-text-muted">3 games</p>
                  </Card>
                  
                  <Card className="text-center py-4">
                    <div className="h-12 w-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                    <h4 className="text-text font-medium">Attention</h4>
                    <p className="text-xs text-text-muted">2 games</p>
                  </Card>
                  
                  <Card className="text-center py-4">
                    <div className="h-12 w-12 mx-auto rounded-full bg-primary/30 flex items-center justify-center mb-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h4 className="text-text font-medium">Recognition</h4>
                    <p className="text-xs text-text-muted">3 games</p>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div 
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Player stats */}
              <motion.div variants={item}>
                <h2 className="text-xl font-display font-semibold text-text flex items-center mb-4">
                  <Trophy size={20} className="text-interactive mr-2" />
                  Your Achievements
                </h2>
                
                <Card className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full blur opacity-30 bg-interactive animate-pulse" />
                      <div className="relative z-10 h-12 w-12 rounded-full bg-interactive/30 flex items-center justify-center">
                        <Trophy size={24} className="text-interactive" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-text">Progress</h3>
                      <p className="text-sm text-text-secondary">
                        {unlockedAchievements.length} of {achievements.length} achievements
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Beginner</span>
                      <span className="text-text-secondary">Advanced</span>
                    </div>
                    <div className="h-2 w-full bg-background-lighter rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-interactive to-accent rounded-full"
                        style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-text-secondary">
                      {unlockedAchievements.length === 0 
                        ? "Start playing games to earn achievements!" 
                        : `Great job! You've unlocked ${unlockedAchievements.length} achievements.`}
                    </p>
                  </div>
                </Card>
                
                {/* Achievement list */}
                <div className="space-y-4">
                  {achievements.slice(0, 3).map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                  
                  {achievements.length > 3 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full"
                    >
                      View All Achievements
                    </Button>
                  )}
                </div>
              </motion.div>
              
              {/* Difficulty levels */}
              <motion.div variants={item}>
                <h3 className="text-lg font-medium text-text mb-4">
                  Difficulty Levels
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-interactive/30 bg-interactive/10">
                    <div className="flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-interactive/20 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-interactive">1</span>
                      </div>
                      <h4 className="font-medium text-text">Beginner</h4>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Simple memory tasks for newcomers and early stages.
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-accent/30 bg-accent/10">
                    <div className="flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-accent">2</span>
                      </div>
                      <h4 className="font-medium text-text">Intermediate</h4>
                    </div>
                    <p className="text-sm text-text-secondary">
                      More challenging tasks that require concentration.
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-highlight/30 bg-highlight/10">
                    <div className="flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-highlight/20 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-highlight">3</span>
                      </div>
                      <h4 className="font-medium text-text">Advanced</h4>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Complex cognitive tasks for maintaining mental fitness.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GamesHub;