import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  isGuest: boolean;
  achievements: string[];
  easterEggMaster: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addAchievement: (achievement: string) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Simple local storage based authentication (replace with Supabase later)
const USERS_KEY = 'fiction_fusion_users';
const CURRENT_USER_KEY = 'fiction_fusion_current_user';

interface StoredUser extends User {
  password: string; // Only stored locally, never exposed
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUserData = localStorage.getItem(CURRENT_USER_KEY);
        if (currentUserData) {
          const userData = JSON.parse(currentUserData);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Helper functions for localStorage operations
  const getStoredUsers = (): StoredUser[] => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const saveStoredUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const saveCurrentUser = (userData: User) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const clearCurrentUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = getStoredUsers();
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!foundUser) {
        throw new Error('No account found with this email address');
      }

      if (foundUser.password !== password) {
        throw new Error('Incorrect password');
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      saveCurrentUser(userWithoutPassword);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!email || !password || !username) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (username.length < 2) {
        throw new Error('Username must be at least 2 characters long');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = getStoredUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Check if username is taken
      const existingUsername = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      if (existingUsername) {
        throw new Error('This username is already taken');
      }

      // Create new user
      const newUser: StoredUser = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        username,
        avatar: '🎭',
        isGuest: false,
        achievements: [],
        easterEggMaster: false,
        password // This stays in localStorage only
      };

      // Save to users list
      users.push(newUser);
      saveStoredUsers(users);

      // Create user object without password and set as current user
      const { password: _, ...userWithoutPassword } = newUser;
      saveCurrentUser(userWithoutPassword);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest-' + Date.now(),
      email: 'guest@fictionfusion.com',
      username: 'Guest User',
      avatar: '👤',
      isGuest: true,
      achievements: [],
      easterEggMaster: false,
    };
    saveCurrentUser(guestUser);
  };

  const logout = () => {
    clearCurrentUser();
    setError(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      
      // If it's not a guest user, update in stored users as well
      if (!user.isGuest) {
        const users = getStoredUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updates };
          saveStoredUsers(users);
        }
      }
      
      saveCurrentUser(updatedUser);
    }
  };

  const addAchievement = (achievement: string) => {
    if (user) {
      const newAchievements = [...user.achievements];
      if (!newAchievements.includes(achievement)) {
        newAchievements.push(achievement);
      }
      
      // Special handling for Easter Egg Master achievement
      const isEasterEggMaster = achievement === 'Easter Egg Master' || user.easterEggMaster;
      
      updateProfile({ 
        achievements: newAchievements,
        easterEggMaster: isEasterEggMaster
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      loginAsGuest, 
      logout, 
      updateProfile, 
      addAchievement,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};