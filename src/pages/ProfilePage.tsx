import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Settings, Star, MessageCircle, Edit3, Save, X, Home, Gamepad2, PenTool, Trophy, Crown, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEasterEgg } from '../contexts/EasterEggContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { darkTheme } from '../utils/colors';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, addAchievement } = useAuth();
  const { foundEggs, totalEggs } = useEasterEgg();
  const navigate = useNavigate();
  const theme = darkTheme;
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '🎭');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const avatars = ['🎭', '👑', '⚡', '🌟', '🎪', '🎨', '🎬', '🦸', '🧙', '👸', '🤖', '👤'];

  // Check for Easter Egg Master achievement
  useEffect(() => {
    if (foundEggs.length === 50 && !user?.easterEggMaster) {
      addAchievement('Easter Egg Master');
    }
  }, [foundEggs, user?.easterEggMaster, addAchievement]);

  const stats = [
    { label: 'Conversations', value: '12', icon: MessageCircle, color: theme.special.lime },
    { label: 'Characters Met', value: '8', icon: Star, color: theme.special.magenta },
    { label: 'Stories Created', value: '3', icon: User, color: theme.special.yellow },
  ];

  const achievements = [
    ...(user?.achievements || []),
    ...(foundEggs.length >= 5 ? ['Egg Hunter'] : []),
    ...(foundEggs.length >= 10 ? ['Egg Collector'] : []),
    ...(foundEggs.length === 50 ? ['Easter Egg Master'] : []),
  ];

  const recentActivities = [
    { id: 1, character: 'Sherlock Holmes', action: 'Started conversation', time: '2 hours ago', avatar: '🔍' },
    { id: 2, character: 'Hermione Granger', action: 'Completed story', time: '1 day ago', avatar: '📚' },
    { id: 3, character: 'Tony Stark', action: 'Role-played scenario', time: '3 days ago', avatar: '🤖' },
    { id: 4, character: 'Elsa', action: 'Character chat', time: '1 week ago', avatar: '❄️' },
    ...(foundEggs.length > 0 ? [{ id: 5, character: 'Easter Egg', action: `Found ${foundEggs.length} hidden treasures`, time: 'Recently', avatar: '🥚' }] : []),
  ];

  const quickActions = [
    { 
      name: 'Start Chat', 
      icon: MessageCircle, 
      color: theme.special.lime, 
      route: '/chat-setup',
      description: 'Begin a new conversation'
    },
    { 
      name: 'Role Play', 
      icon: Gamepad2, 
      color: theme.special.magenta, 
      route: '/play-setup',
      description: 'Create interactive scenarios'
    },
    { 
      name: 'Create Story', 
      icon: PenTool, 
      color: theme.special.yellow, 
      route: '/create-setup',
      description: 'Direct your own adventure'
    },
    { 
      name: 'Go Home', 
      icon: Home, 
      color: theme.accent.primary, 
      route: '/home',
      description: 'Return to main page'
    },
  ];

  const handleSaveProfile = () => {
    updateProfile({
      username: editForm.username,
      email: editForm.email,
      avatar: selectedAvatar
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      username: user?.username || '',
      email: user?.email || ''
    });
    setSelectedAvatar(user?.avatar || '🎭');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Background with Wave Effects */}
      <div className="absolute inset-0 opacity-80">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{ background: theme.gradients.acrylic }}
        />
      </div>

      <Header />
      
      <main className="flex-1 py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 
              className="text-4xl font-bold mb-4 text-white drop-shadow-lg"
              style={{ 
                textShadow: '0 0 15px rgba(128, 182, 38, 0.5)'
              }}
            >
              Your RPG Profile
            </h1>
            <p 
              className="text-xl text-white opacity-90"
            >
              Manage your Fiction Fusion adventure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Main Profile Card */}
              <div 
                className="p-8 rounded-3xl backdrop-blur-md shadow-2xl"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.special.lime}20`
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 
                    className="text-2xl font-bold flex items-center text-white"
                  >
                    <User className="w-6 h-6 mr-3" style={{ color: theme.special.lime }} />
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
                      style={{
                        backgroundColor: theme.special.lime,
                        color: theme.background.primary
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
                        style={{
                          backgroundColor: theme.accent.success,
                          color: theme.background.primary
                        }}
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
                        style={{
                          backgroundColor: theme.text.muted,
                          color: theme.background.primary
                        }}
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </motion.button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2 text-white opacity-80"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editForm.username : user?.username || ''}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all text-white"
                      style={{
                        backgroundColor: theme.background.secondary,
                        border: `2px solid ${theme.border.primary}`,
                        focusRingColor: theme.special.lime
                      }}
                      readOnly={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2 text-white opacity-80"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={isEditing ? editForm.email : user?.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all text-white"
                      style={{
                        backgroundColor: theme.background.secondary,
                        border: `2px solid ${theme.border.primary}`,
                        focusRingColor: theme.special.lime
                      }}
                      readOnly={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2 text-white opacity-80"
                    >
                      Account Type
                    </label>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: user?.isGuest ? `${theme.accent.warning}20` : `${theme.accent.success}20`,
                          color: user?.isGuest ? theme.accent.warning : theme.accent.success,
                          border: `1px solid ${user?.isGuest ? theme.accent.warning : theme.accent.success}`
                        }}
                      >
                        {user?.isGuest ? 'Guest Account' : 'Registered User'}
                      </span>
                      {user?.easterEggMaster && (
                        <span 
                          className="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1"
                          style={{
                            backgroundColor: `${theme.special.coral}20`,
                            color: theme.special.coral,
                            border: `1px solid ${theme.special.coral}`
                          }}
                        >
                          <Crown className="w-4 h-4" />
                          <span>Easter Egg Master</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Selection */}
              <div 
                className="p-8 rounded-3xl backdrop-blur-md shadow-2xl"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.special.magenta}20`
                }}
              >
                <h2 
                  className="text-2xl font-bold mb-6 text-white"
                >
                  Choose Your Avatar
                </h2>
                
                <div className="grid grid-cols-6 gap-4">
                  {avatars.map((avatar) => (
                    <motion.button
                      key={avatar}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAvatar(avatar)}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
                      style={{
                        backgroundColor: selectedAvatar === avatar ? theme.special.magenta : theme.background.secondary,
                        border: selectedAvatar === avatar ? `3px solid ${theme.special.magenta}` : `2px solid ${theme.border.primary}`,
                        boxShadow: selectedAvatar === avatar ? `0 0 20px ${theme.special.magenta}40` : 'none'
                      }}
                    >
                      {avatar}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
              {achievements.length > 0 && (
                <div 
                  className="p-8 rounded-3xl backdrop-blur-md shadow-2xl"
                  style={{
                    backgroundColor: theme.glass.background,
                    border: `2px solid ${theme.border.accent}`,
                    boxShadow: `0 0 40px ${theme.special.coral}20`
                  }}
                >
                  <h2 
                    className="text-2xl font-bold mb-6 text-white flex items-center"
                  >
                    <Trophy className="w-6 h-6 mr-3" style={{ color: theme.special.coral }} />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-4 rounded-xl"
                        style={{
                          backgroundColor: achievement === 'Easter Egg Master' ? `${theme.special.coral}20` : theme.background.secondary,
                          border: achievement === 'Easter Egg Master' ? `2px solid ${theme.special.coral}` : `1px solid ${theme.border.primary}`
                        }}
                      >
                        {achievement === 'Easter Egg Master' ? (
                          <Crown className="w-6 h-6" style={{ color: theme.special.coral }} />
                        ) : achievement.includes('Egg') ? (
                          <Trophy className="w-6 h-6" style={{ color: theme.special.yellow }} />
                        ) : (
                          <Shield className="w-6 h-6" style={{ color: theme.special.lime }} />
                        )}
                        <span className="text-white font-medium">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div 
                className="p-8 rounded-3xl backdrop-blur-md shadow-2xl"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.special.yellow}20`
                }}
              >
                <h2 
                  className="text-2xl font-bold mb-6 text-white"
                >
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <motion.div 
                      key={activity.id} 
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-4 rounded-xl transition-all duration-300"
                      style={{ backgroundColor: theme.background.secondary }}
                    >
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"
                          style={{ background: theme.gradients.primary }}
                        >
                          {activity.avatar}
                        </div>
                        <div>
                          <h3 
                            className="font-semibold text-white"
                          >
                            {activity.character}
                          </h3>
                          <p 
                            className="text-sm text-white opacity-70"
                          >
                            {activity.action}
                          </p>
                        </div>
                      </div>
                      <span 
                        className="text-xs text-white opacity-60"
                      >
                        {activity.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats & Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Stats */}
              <div 
                className="p-6 rounded-3xl backdrop-blur-md shadow-2xl"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.accent.primary}20`
                }}
              >
                <h3 
                  className="text-xl font-bold mb-6 text-white"
                >
                  Your Stats
                </h3>
                
                <div className="space-y-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ backgroundColor: `${stat.color}10` }}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: stat.color }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">{stat.label}</span>
                        </div>
                        <span 
                          className="text-2xl font-bold"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div 
                className="p-6 rounded-3xl backdrop-blur-md shadow-2xl"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.special.lime}20`
                }}
              >
                <h3 
                  className="text-xl font-bold mb-6 text-white"
                >
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(action.route)}
                        className="w-full p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-3 text-left"
                        style={{
                          backgroundColor: `${action.color}20`,
                          border: `1px solid ${action.color}40`
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: action.color }} />
                        <div>
                          <div className="font-medium text-white">{action.name}</div>
                          <div className="text-xs text-white opacity-70">{action.description}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Profile Preview */}
              <div 
                className="p-6 rounded-3xl text-center backdrop-blur-md shadow-2xl"
                style={{
                  backgroundColor: theme.glass.background,
                  border: `2px solid ${theme.border.accent}`,
                  boxShadow: `0 0 40px ${theme.special.magenta}20`
                }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-2xl relative"
                  style={{ background: theme.gradients.primary }}
                >
                  {selectedAvatar}
                  {user?.easterEggMaster && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.special.coral}, ${theme.special.yellow})`,
                        boxShadow: `0 0 15px ${theme.special.coral}60`
                      }}
                    >
                      <Crown className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
                <h4 
                  className="text-lg font-semibold text-white"
                >
                  {user?.username}
                </h4>
                <p 
                  className="text-sm text-white opacity-70"
                >
                  {user?.easterEggMaster ? 'Easter Egg Master' : 'RPG Explorer'}
                </p>
                <div 
                  className="mt-3 px-3 py-1 rounded-full text-xs font-medium inline-block"
                  style={{
                    backgroundColor: `${theme.special.lime}20`,
                    color: theme.special.lime,
                    border: `1px solid ${theme.special.lime}40`
                  }}
                >
                  Level {foundEggs.length >= 50 ? 'Master' : foundEggs.length >= 5 ? '2' : '1'} Adventurer
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;