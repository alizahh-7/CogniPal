import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, HeartPulse, Volume2, Mic } from 'lucide-react';
import Button from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';
import Particles from '../components/Particles';
import { useAppStore } from '../store';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppStore();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background pt-20">
        {/* Floating particles background */}
        <Particles count={70} />
        
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          {/* Main content */}
          <motion.div
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-8 relative">
              <div className="absolute -inset-4 rounded-full blur-xl opacity-30 bg-interactive animate-pulse" />
              <span role="img" aria-label="brain" className="relative text-8xl">🧠</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-interactive to-accent">CogniPal</span>
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Begin your adventure into memory training and cognitive health
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Button 
                  size="lg" 
                  variant="primary"
                  icon={<User size={20} />}
                  onClick={() => navigate('/login', { state: { role: 'patient' } })}
                  className="w-full sm:w-auto"
                >
                  I'm a Patient
                </Button>
              </motion.div>
              
              <motion.div variants={item}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  icon={<HeartPulse size={20} />}
                  onClick={() => navigate('/login', { state: { role: 'caregiver' } })}
                  className="w-full sm:w-auto"
                >
                  I'm a Caregiver
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Quick access to voice and sound controls */}
            <motion.div 
              className="flex justify-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                icon={<Volume2 size={18} />}
                onClick={() => {
                  const store = useAppStore.getState();
                  store.toggleSound();
                }}
              >
                Sound
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                icon={<Mic size={18} />}
                onClick={() => {
                  const store = useAppStore.getState();
                  store.toggleVoiceAssistant();
                }}
              >
                Voice
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-40 left-20 hidden lg:block">
            <motion.div
              className="w-12 h-12 rounded-lg bg-interactive/20 backdrop-blur-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="absolute bottom-40 right-20 hidden lg:block">
            <motion.div
              className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-lg"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          <div className="absolute bottom-60 left-40 hidden lg:block">
            <motion.div
              className="w-10 h-10 rounded-md bg-highlight/20 backdrop-blur-lg"
              animate={{ 
                rotate: [0, 180], 
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;