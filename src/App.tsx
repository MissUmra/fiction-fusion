import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { EasterEggProvider } from './contexts/EasterEggContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChatSetupPage from './pages/ChatSetupPage';
import PlaySetupPage from './pages/PlaySetupPage';
import CreateSetupPage from './pages/CreateSetupPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import { darkTheme, lightTheme } from './utils/colors';
import { useTheme } from './contexts/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <div 
      className="min-h-screen transition-colors duration-300 relative overflow-hidden"
    >
      {/* Acrylic Painting Texture Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          background: theme.gradients.acrylic,
          backgroundSize: '400% 400%, 300% 300%, 500% 500%, 350% 350%, 450% 450%, 100% 100%',
          animation: 'acrylicFlow 25s ease-in-out infinite'
        }}
      />
      
      {/* Additional texture overlay for more depth */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 60% 40%, ${theme.acrylic.color3}15 0%, transparent 70%),
            radial-gradient(circle at 30% 70%, ${theme.acrylic.color4}20 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, ${theme.acrylic.color1}25 0%, transparent 50%)
          `,
          backgroundSize: '600% 600%, 400% 400%, 350% 350%',
          animation: 'acrylicTexture 30s ease-in-out infinite reverse'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat-setup" element={<ChatSetupPage />} />
          <Route path="/play-setup" element={<PlaySetupPage />} />
          <Route path="/create-setup" element={<CreateSetupPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EasterEggProvider>
          <Router>
            <AppContent />
          </Router>
        </EasterEggProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;