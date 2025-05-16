import { create } from 'zustand';
import { User, Game, Achievement } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  darkMode: boolean;
  soundEnabled: boolean;
  voiceAssistantEnabled: boolean;
  games: Game[];
  achievements: Achievement[];
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string, role: 'patient' | 'caregiver') => Promise<boolean>;
  logout: () => void;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  toggleVoiceAssistant: () => void;
  updateGameProgress: (gameId: string, progress: number) => void;
  completeGame: (gameId: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

// Mock data
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Match Faces',
    description: 'Match the faces with their corresponding names',
    icon: 'user-check',
    difficulty: 'easy',
    category: 'memory',
    completed: false,
    progress: 0,
  },
  {
    id: '2',
    title: 'Memory Recall',
    description: 'Remember and recall patterns shown previously',
    icon: 'brain',
    difficulty: 'medium',
    category: 'memory',
    completed: false,
    progress: 0,
  },
  {
    id: '3',
    title: 'Pattern Puzzle',
    description: 'Complete the missing parts of the pattern',
    icon: 'puzzle',
    difficulty: 'medium',
    category: 'puzzle',
    completed: false,
    progress: 0,
  },
  {
    id: '4',
    title: 'Story Recall',
    description: 'Read a story and answer questions about it later',
    icon: 'book-open',
    difficulty: 'hard',
    category: 'comprehension',
    completed: false,
    progress: 0,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first game',
    icon: 'award',
    unlocked: false,
  },
  {
    id: '2',
    title: 'Memory Master',
    description: 'Complete all memory games',
    icon: 'trophy',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Daily Streak',
    description: 'Play games 7 days in a row',
    icon: 'flame',
    unlocked: false,
  },
  {
    id: '4',
    title: 'Perfect Score',
    description: 'Get a perfect score in any game',
    icon: 'medal',
    unlocked: false,
  },
];

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  darkMode: true,
  soundEnabled: true,
  voiceAssistantEnabled: true,
  games: mockGames,
  achievements: mockAchievements,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  login: async (email, password, role) => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login
    const mockUser: User = {
      id: '1',
      name: role === 'patient' ? 'Alex Johnson' : 'Dr. Sarah Williams',
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    set({ user: mockUser, isAuthenticated: true });
    return true;
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  toggleVoiceAssistant: () => set((state) => ({ 
    voiceAssistantEnabled: !state.voiceAssistantEnabled 
  })),
  
  updateGameProgress: (gameId, progress) => set((state) => ({
    games: state.games.map((game) => 
      game.id === gameId ? { ...game, progress } : game
    ),
  })),
  
  completeGame: (gameId) => set((state) => ({
    games: state.games.map((game) => 
      game.id === gameId ? { ...game, completed: true, progress: 100 } : game
    ),
  })),
  
  unlockAchievement: (achievementId) => set((state) => ({
    achievements: state.achievements.map((achievement) => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true, date: new Date().toISOString() } 
        : achievement
    ),
  })),
}));