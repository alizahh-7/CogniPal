export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'caregiver';
  avatar: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  completed: boolean;
  progress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface PatientProgress {
  id: string;
  name: string;
  avatar: string;
  overallProgress: number;
  gameStats: {
    gameId: string;
    gameName: string;
    progress: number;
    lastPlayed: string;
  }[];
  emotionTracking: {
    date: string;
    mood: 'great' | 'good' | 'neutral' | 'sad' | 'frustrated';
  }[];
}