import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Award, 
  Brain,
  Clock,
  Activity,
  ChevronRight
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import ProgressBar from '../components/ui/ProgressBar';
import PageTransition from '../components/layout/PageTransition';
import GameCard from '../components/games/GameCard';
import AchievementCard from '../components/achievements/AchievementCard';
import { useAppStore } from '../store';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, games, achievements } = useAppStore();
  
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    } else if (user.role !== 'patient') {
      navigate(`/dashboard/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!user) return null;
  
  const featuredGames = games.slice(0, 2);
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const nextAchievement = achievements.find(a => !a.unlocked);
  
  // Calculate overall progress as average of all games
  const overallProgress = games.length 
    ? games.reduce((sum, game) => sum + game.progress, 0) / games.length 
    : 0;
  
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
            <div className="flex items-center gap-4 mb-6">
              <Avatar 
                src={user.avatar} 
                alt={user.name} 
                size="lg" 
                border 
              />
              <div>
                <h1 className="text-2xl font-display font-bold text-text">
                  Welcome, {user.name}
                </h1>
                <p className="text-text-secondary">
                  Let's continue your memory training journey
                </p>
              </div>
            </div>
            
            <Card className="bg-primary/30 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-text mb-3">
                    Overall Progress
                  </h3>
                  <div className="h-4 mb-2">
                    <ProgressBar progress={overallProgress} size="lg" showValue />
                  </div>
                  <p className="text-sm text-text-secondary">
                    You're doing great! Keep up the good work.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant="accent"
                    icon={<Brain size={18} />}
                    onClick={() => navigate('/games')}
                  >
                    Games Hub
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Calendar size={18} />}
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Featured games */}
              <motion.div variants={item}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-semibold text-text">
                    Continue Training
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconPosition="right"
                    icon={<ChevronRight size={16} />}
                    onClick={() => navigate('/games')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredGames.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </motion.div>
              
              {/* Recent activity */}
              <motion.div variants={item}>
                <div className="flex items-center mb-4">
                  <Activity size={20} className="text-interactive mr-2" />
                  <h2 className="text-xl font-display font-semibold text-text">
                    Recent Activity
                  </h2>
                </div>
                
                <Card>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-interactive/20 flex items-center justify-center mt-1">
                        <Brain size={20} className="text-interactive" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Memory Recall Game</h4>
                        <p className="text-sm text-text-secondary">
                          You completed level 2 with a score of 85%
                        </p>
                        <p className="text-xs text-text-muted mt-1">Today, 10:30 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                        <Award size={20} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Achievement Unlocked</h4>
                        <p className="text-sm text-text-secondary">
                          You earned the "First Steps" achievement
                        </p>
                        <p className="text-xs text-text-muted mt-1">Yesterday, 3:45 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center mt-1">
                        <Clock size={20} className="text-text" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Daily Training</h4>
                        <p className="text-sm text-text-secondary">
                          Started a new training schedule
                        </p>
                        <p className="text-xs text-text-muted mt-1">2 days ago, 9:15 AM</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div 
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Calendar */}
              <motion.div variants={item}>
                <div className="flex items-center mb-4">
                  <Calendar size={20} className="text-interactive mr-2" />
                  <h2 className="text-xl font-display font-semibold text-text">
                    Today
                  </h2>
                </div>
                
                <Card>
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-medium text-text">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    </h3>
                    <p className="text-3xl font-bold text-text mt-1">
                      {new Date().getDate()}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  
                  <div className="border-t border-primary/20 pt-3 mt-3">
                    <h4 className="text-sm font-medium text-text mb-2">Upcoming Sessions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-text">Memory Training</p>
                          <p className="text-xs text-text-muted">2:00 PM</p>
                        </div>
                        <Button variant="ghost" size="sm">Start</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-text">Face Recognition</p>
                          <p className="text-xs text-text-muted">4:30 PM</p>
                        </div>
                        <Button variant="ghost" size="sm">Start</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              {/* Achievements */}
              <motion.div variants={item}>
                <div className="flex items-center mb-4">
                  <Award size={20} className="text-interactive mr-2" />
                  <h2 className="text-xl font-display font-semibold text-text">
                    Achievements
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {unlockedAchievements.length > 0 ? (
                    <AchievementCard achievement={unlockedAchievements[0]} />
                  ) : null}
                  
                  {nextAchievement && (
                    <div>
                      <p className="text-sm text-text-secondary mb-2">Next achievement:</p>
                      <AchievementCard achievement={nextAchievement} />
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    iconPosition="right"
                    icon={<ChevronRight size={16} />}
                  >
                    View All Achievements
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PatientDashboard;