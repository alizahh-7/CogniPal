import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail, UserCheck, HeartPulse, Mic, Image } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import PageTransition from '../components/layout/PageTransition';
import { useAppStore } from '../store';

interface LocationState {
  role?: 'patient' | 'caregiver';
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'patient' | 'caregiver'>(state?.role || 'patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAppStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formType === 'signup' && !name) {
      setError('Please enter your name');
      return;
    }
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    if (!password) {
      setError('Please enter your password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (formType === 'login') {
        const success = await login(email, password, role);
        if (success) {
          navigate(`/dashboard/${role}`);
        } else {
          setError('Invalid credentials');
        }
      } else {
        // In a real app, this would register a new user
        // For now, we'll just simulate success and log them in
        const success = await login(email, password, role);
        if (success) {
          navigate(`/dashboard/${role}`);
        } else {
          setError('Error creating account');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
    setError('');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl font-display font-bold text-text mb-2">
                {formType === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-text-secondary">
                {formType === 'login' 
                  ? 'Log in to continue your memory training journey' 
                  : 'Begin your memory enhancement adventure'}
              </p>
            </motion.div>
            
            <Card className="backdrop-blur-sm">
              {/* Role switcher */}
              <div className="mb-6">
                <div className="flex bg-background-lighter p-1 rounded-lg">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200 ${
                      role === 'patient'
                        ? 'bg-interactive text-text'
                        : 'text-text-secondary hover:text-text'
                    }`}
                    onClick={() => setRole('patient')}
                  >
                    <User size={18} className="mr-2" />
                    Patient
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200 ${
                      role === 'caregiver'
                        ? 'bg-interactive text-text'
                        : 'text-text-secondary hover:text-text'
                    }`}
                    onClick={() => setRole('caregiver')}
                  >
                    <HeartPulse size={18} className="mr-2" />
                    Caregiver
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {formType === 'signup' && (
                  <div className="mb-4">
                    <Input
                      label="Full Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      icon={<UserCheck size={18} />}
                    />
                  </div>
                )}
                
                <div className="mb-4">
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    icon={<Mail size={18} />}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    icon={<Lock size={18} />}
                  />
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
                    {error}
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full mb-4"
                  isLoading={isLoading}
                >
                  {formType === 'login' ? 'Login' : 'Create Account'}
                </Button>
                
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<Mic size={16} />}
                  >
                    Voice Input
                  </Button>
                  
                  {formType === 'signup' && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon={<Image size={16} />}
                    >
                      Upload Photo
                    </Button>
                  )}
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-text-secondary text-sm">
                  {formType === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                  <button
                    type="button"
                    onClick={toggleFormType}
                    className="text-interactive hover:text-interactive-light ml-2"
                  >
                    {formType === 'login' ? 'Sign up' : 'Login'}
                  </button>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;