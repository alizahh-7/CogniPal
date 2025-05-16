import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart, 
  Calendar, 
  Plus,
  List,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Brain
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import ProgressBar from '../components/ui/ProgressBar';
import PageTransition from '../components/layout/PageTransition';
import Input from '../components/ui/Input';
import { useAppStore } from '../store';
import { PatientProgress, Reminder } from '../types';

// Mock data
const mockPatients: PatientProgress[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    overallProgress: 68,
    gameStats: [
      { gameId: '1', gameName: 'Match Faces', progress: 85, lastPlayed: '2023-05-01T14:30:00Z' },
      { gameId: '2', gameName: 'Memory Recall', progress: 60, lastPlayed: '2023-05-03T10:15:00Z' },
      { gameId: '3', gameName: 'Pattern Puzzle', progress: 45, lastPlayed: '2023-05-02T16:45:00Z' },
      { gameId: '4', gameName: 'Story Recall', progress: 30, lastPlayed: '2023-05-04T09:30:00Z' },
    ],
    emotionTracking: [
      { date: '2023-05-01', mood: 'good' },
      { date: '2023-05-02', mood: 'great' },
      { date: '2023-05-03', mood: 'neutral' },
      { date: '2023-05-04', mood: 'good' },
    ],
  },
  {
    id: '2',
    name: 'Robert Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
    overallProgress: 42,
    gameStats: [
      { gameId: '1', gameName: 'Match Faces', progress: 50, lastPlayed: '2023-05-01T11:30:00Z' },
      { gameId: '2', gameName: 'Memory Recall', progress: 35, lastPlayed: '2023-05-02T14:15:00Z' },
      { gameId: '3', gameName: 'Pattern Puzzle', progress: 55, lastPlayed: '2023-05-03T16:45:00Z' },
      { gameId: '4', gameName: 'Story Recall', progress: 28, lastPlayed: '2023-05-04T10:30:00Z' },
    ],
    emotionTracking: [
      { date: '2023-05-01', mood: 'neutral' },
      { date: '2023-05-02', mood: 'sad' },
      { date: '2023-05-03', mood: 'good' },
      { date: '2023-05-04', mood: 'neutral' },
    ],
  },
];

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Memory Training Session',
    description: 'Help Emma with the daily memory exercise',
    date: '2023-05-05T14:00:00Z',
    completed: false,
  },
  {
    id: '2',
    title: 'Doctor Appointment',
    description: 'Dr. Williams - Neurologist',
    date: '2023-05-06T10:30:00Z',
    completed: false,
  },
  {
    id: '3',
    title: 'Medication Reminder',
    description: 'Evening dose of Aricept',
    date: '2023-05-04T19:00:00Z',
    completed: true,
  },
];

const CaregiverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppStore();
  
  const [selectedPatient, setSelectedPatient] = useState<PatientProgress>(mockPatients[0]);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [newReminderText, setNewReminderText] = useState('');
  
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    } else if (user.role !== 'caregiver') {
      navigate(`/dashboard/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!user) return null;
  
  const handleAddReminder = () => {
    if (!newReminderText.trim()) return;
    
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: newReminderText,
      description: '',
      date: new Date().toISOString(),
      completed: false,
    };
    
    setReminders([newReminder, ...reminders]);
    setNewReminderText('');
  };
  
  const toggleReminderComplete = (id: string) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed } 
          : reminder
      )
    );
  };
  
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
                  Caregiver Dashboard
                </h1>
                <p className="text-text-secondary">
                  Monitor and assist your patients' cognitive health
                </p>
              </div>
            </div>
            
            <Card className="bg-primary/30 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-text mb-3">
                    Your Patients
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {mockPatients.map(patient => (
                      <motion.div
                        key={patient.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPatient(patient)}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedPatient.id === patient.id 
                            ? 'bg-interactive/30 shadow-glow-purple' 
                            : 'bg-background-lighter hover:bg-interactive/20'
                        }`}
                      >
                        <Avatar 
                          src={patient.avatar} 
                          alt={patient.name} 
                          size="sm" 
                        />
                        <span className="text-sm text-text">{patient.name}</span>
                      </motion.div>
                    ))}
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-background-lighter hover:bg-interactive/20 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-interactive/20 flex items-center justify-center">
                        <Plus size={16} className="text-interactive" />
                      </div>
                      <span className="text-sm text-text-secondary">Add New</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant="accent"
                    icon={<BarChart size={18} />}
                  >
                    Reports
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
              {/* Patient overview */}
              <motion.div variants={item}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Users size={20} className="text-interactive mr-2" />
                    <h2 className="text-xl font-display font-semibold text-text">
                      Patient Overview
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconPosition="right"
                    icon={<ChevronRight size={16} />}
                  >
                    Full Profile
                  </Button>
                </div>
                
                <Card>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <Avatar 
                      src={selectedPatient.avatar} 
                      alt={selectedPatient.name} 
                      size="xl" 
                      border 
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-text mb-1">
                        {selectedPatient.name}
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Patient ID: {selectedPatient.id}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-text-secondary">Overall Progress</span>
                            <span className="text-sm text-text">{selectedPatient.overallProgress}%</span>
                          </div>
                          <ProgressBar progress={selectedPatient.overallProgress} size="md" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="flex items-center text-text-secondary mb-1">
                              <Brain size={16} className="mr-1" />
                              <span className="text-sm">Activity Level</span>
                            </div>
                            <span className="text-lg font-medium text-text">Moderate</span>
                          </div>
                          
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="flex items-center text-text-secondary mb-1">
                              <Clock size={16} className="mr-1" />
                              <span className="text-sm">Last Session</span>
                            </div>
                            <span className="text-lg font-medium text-text">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-primary/20 pt-4">
                    <h4 className="text-md font-medium text-text mb-3">Game Performance</h4>
                    <div className="space-y-3">
                      {selectedPatient.gameStats.map(stat => (
                        <div key={stat.gameId}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-text">{stat.gameName}</span>
                            <span className="text-sm text-text-secondary">
                              Last played: {new Date(stat.lastPlayed).toLocaleDateString()}
                            </span>
                          </div>
                          <ProgressBar 
                            progress={stat.progress} 
                            size="sm" 
                            showValue
                            variant={stat.progress > 70 ? 'highlight' : stat.progress > 40 ? 'primary' : 'accent'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              {/* Emotion tracking */}
              <motion.div variants={item}>
                <div className="flex items-center mb-4">
                  <BarChart size={20} className="text-interactive mr-2" />
                  <h2 className="text-xl font-display font-semibold text-text">
                    Emotion Tracking
                  </h2>
                </div>
                
                <Card>
                  <div className="mb-4">
                    <h4 className="text-md font-medium text-text mb-3">Recent Moods</h4>
                    <div className="flex justify-between">
                      {selectedPatient.emotionTracking.map((emotion, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className={`
                              w-12 h-12 rounded-full flex items-center justify-center mb-2
                              ${emotion.mood === 'great' ? 'bg-highlight/30 text-highlight' : ''}
                              ${emotion.mood === 'good' ? 'bg-interactive/30 text-interactive' : ''}
                              ${emotion.mood === 'neutral' ? 'bg-text-muted/30 text-text-muted' : ''}
                              ${emotion.mood === 'sad' ? 'bg-accent/30 text-accent' : ''}
                              ${emotion.mood === 'frustrated' ? 'bg-error/30 text-error' : ''}
                            `}
                          >
                            <span role="img" aria-label={emotion.mood} className="text-xl">
                              {emotion.mood === 'great' && '😄'}
                              {emotion.mood === 'good' && '🙂'}
                              {emotion.mood === 'neutral' && '😐'}
                              {emotion.mood === 'sad' && '😔'}
                              {emotion.mood === 'frustrated' && '😠'}
                            </span>
                          </div>
                          <span className="text-xs text-text-secondary">
                            {new Date(emotion.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-primary/20 pt-4">
                    <h4 className="text-md font-medium text-text mb-3">Mood Notes</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-text-secondary">
                        Patient has been consistently in a positive mood over the past week.
                        Slight dip on Wednesday could be related to difficulty with the new memory exercises.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        Add Note
                      </Button>
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
              {/* Reminders */}
              <motion.div variants={item}>
                <div className="flex items-center mb-4">
                  <List size={20} className="text-interactive mr-2" />
                  <h2 className="text-xl font-display font-semibold text-text">
                    Reminders
                  </h2>
                </div>
                
                <Card>
                  <div className="mb-4">
                    <Input
                      placeholder="Add a new reminder..."
                      value={newReminderText}
                      onChange={(e) => setNewReminderText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddReminder()}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full mt-2"
                      onClick={handleAddReminder}
                      icon={<Plus size={16} />}
                    >
                      Add Reminder
                    </Button>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {reminders.map(reminder => (
                      <div 
                        key={reminder.id}
                        className={`p-3 rounded-lg transition-colors duration-200 ${
                          reminder.completed 
                            ? 'bg-background/50 text-text-muted' 
                            : 'bg-background-lighter'
                        }`}
                      >
                        <div className="flex items-start">
                          <button
                            onClick={() => toggleReminderComplete(reminder.id)}
                            className="mt-1 mr-2 flex-shrink-0"
                          >
                            {reminder.completed ? (
                              <CheckCircle size={18} className="text-interactive" />
                            ) : (
                              <AlertCircle size={18} className="text-accent" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium ${reminder.completed ? 'line-through text-text-muted' : 'text-text'}`}>
                              {reminder.title}
                            </p>
                            {reminder.description && (
                              <p className="text-sm text-text-secondary mt-1">
                                {reminder.description}
                              </p>
                            )}
                            <p className="text-xs text-text-muted mt-1">
                              {new Date(reminder.date).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
              
              {/* Quick actions */}
              <motion.div variants={item}>
                <div className="flex items-center mb-4">
                  <Brain size={20} className="text-interactive mr-2" />
                  <h2 className="text-xl font-display font-semibold text-text">
                    Quick Actions
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="primary"
                    className="justify-start"
                    icon={<Plus size={18} />}
                  >
                    Create New Training Plan
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="justify-start"
                    icon={<Calendar size={18} />}
                  >
                    Schedule Appointment
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="justify-start"
                    icon={<BarChart size={18} />}
                  >
                    Generate Progress Report
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="justify-start"
                    icon={<Users size={18} />}
                  >
                    Manage Patients
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

export default CaregiverDashboard;