import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import CaregiverDashboard from './pages/CaregiverDashboard';
import GamesHub from './pages/GamesHub';
import MatchFaces from './games/MatchFaces';
import MemoryRecall from './games/MemoryRecall';
import PatternPuzzle from './games/PatternPuzzle';
import StoryRecall from './games/StoryRecall';

function App() {
  return (
    <div className="bg-background text-text min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/caregiver" element={<CaregiverDashboard />} />
            <Route path="/games" element={<GamesHub />} />
            <Route path="/games/match-faces" element={<MatchFaces />} />
            <Route path="/games/memory-recall" element={<MemoryRecall />} />
            <Route path="/games/pattern-puzzle" element={<PatternPuzzle />} />
            <Route path="/games/story-recall" element={<StoryRecall />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;