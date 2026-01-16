import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    const userDataToStore = {
      type: userData.type, // 'student' or 'teacher'
      username: userData.username,
      uid: userData.uid,
      subject: userData.subject,
      minUid: userData.minUid,
      maxUid: userData.maxUid,
      avatar: userData.avatar || 'default_avatar',
      frame: userData.frame || 'default_frame',
      globalXP: userData.globalXP || 0,
      coins: userData.coins || 0,
      loginTime: new Date().toISOString(),
    };

    setUser(userDataToStore);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userDataToStore));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Update user function
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Get user by type
  const getUserType = () => user?.type || null;

  // Check if user is student
  const isStudent = () => user?.type === 'student';

  // Check if user is teacher
  const isTeacher = () => user?.type === 'teacher';

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    getUserType,
    isStudent,
    isTeacher,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
