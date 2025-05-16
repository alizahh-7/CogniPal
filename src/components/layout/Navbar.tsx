import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Volume2, VolumeX, Mic, MicOff, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { useAppStore } from '../../store';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const { 
    isAuthenticated, 
    soundEnabled, 
    voiceAssistantEnabled,
    toggleSound,
    toggleVoiceAssistant,
    logout
  } = useAppStore();
  
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  
  const showBackButton = !isHomePage && !isLoginPage;

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-background-card/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side - Logo and back button */}
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft size={18} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          )}
          
          <div 
            className="flex items-center text-text cursor-pointer"
            onClick={() => navigate('/')}
          >
            <motion.div
              className="text-interactive mr-2"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                repeatDelay: 5
              }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full blur opacity-50 bg-interactive animate-pulse" />
                <span role="img" aria-label="brain" className="relative z-10 text-2xl">🧠</span>
              </div>
            </motion.div>
            <h1 className="font-display font-bold text-xl hidden sm:block">CogniPal</h1>
          </div>
        </div>
        
        {/* Right side - Controls and profile */}
        <div className="hidden md:flex items-center space-x-3">
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            icon={soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          />
          
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleVoiceAssistant}
            icon={voiceAssistantEnabled ? <Mic size={18} /> : <MicOff size={18} />}
            aria-label={voiceAssistantEnabled ? "Disable voice assistant" : "Enable voice assistant"}
          />
          
          {isAuthenticated && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              icon={<Home size={18} />}
            >
              Home
            </Button>
          )}
          
          {isAuthenticated && (
            <Button 
              variant="primary"
              size="sm"
              onClick={logout}
            >
              Log Out
            </Button>
          )}
        </div>
        
        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            icon={isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 bg-background-card border-b border-primary/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Button 
                variant="ghost"
                size="sm"
                onClick={toggleSound}
                icon={soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              >
                {soundEnabled ? "Mute Sound" : "Enable Sound"}
              </Button>
              
              <Button 
                variant="ghost"
                size="sm"
                onClick={toggleVoiceAssistant}
                icon={voiceAssistantEnabled ? <Mic size={18} /> : <MicOff size={18} />}
              >
                {voiceAssistantEnabled ? "Disable Voice" : "Enable Voice"}
              </Button>
              
              {isAuthenticated && (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate('/');
                    setIsMenuOpen(false);
                  }}
                  icon={<Home size={18} />}
                >
                  Home
                </Button>
              )}
              
              {isAuthenticated && (
                <Button 
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;