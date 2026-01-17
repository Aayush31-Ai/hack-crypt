// localStorage Service for simulating backend

const STORAGE_KEYS = {
  PLAYER_PROGRESS: 'hackcrypt_player_progress',
  COMPLETED_STAGES: 'hackcrypt_completed_stages',
  PLAYER_DATA: 'hackcrypt_player_data',
  WORLD_PROGRESS: 'hackcrypt_world_progress',
  QUIZ_SCORES: 'hackcrypt_quiz_scores',
  PLAYER_STATS: 'hackcrypt_player_stats',
};

// Initialize default player data
const DEFAULT_PLAYER = {
  uid: '001',
  name: 'Player One',
  avatar: '/assets/avataar/avatar1.png',
  level: 1,
  xp: 0,
  badges: [
    { id: 'mastery-unlocked', name: 'Mastery Unlocked', earnedAt: new Date().toISOString() },
    { id: 'problem-solver', name: 'Problem Solver', earnedAt: new Date().toISOString() },
  ],
  inventory: [],
};

// Get all player data
export const getPlayerData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PLAYER_DATA);
    if (data) {
      return JSON.parse(data);
    }
    // Seed defaults into storage on first run
    localStorage.setItem(STORAGE_KEYS.PLAYER_DATA, JSON.stringify(DEFAULT_PLAYER));
    return DEFAULT_PLAYER;
  } catch (error) {
    console.error('Error reading player data:', error);
    return DEFAULT_PLAYER;
  }
};

// Save player data
export const savePlayerData = (playerData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAYER_DATA, JSON.stringify(playerData));
    return true;
  } catch (error) {
    console.error('Error saving player data:', error);
    return false;
  }
};

// Get completed stages
export const getCompletedStages = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_STAGES);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading completed stages:', error);
    return {};
  }
};

// Mark stage as completed
export const completeStage = (worldId, zoneId, stageId, score) => {
  try {
    const completed = getCompletedStages();
    const key = `${worldId}_${zoneId}_${stageId}`;
    
    completed[key] = {
      completed: true,
      completedAt: new Date().toISOString(),
      score: score || 100,
      attempts: (completed[key]?.attempts || 0) + 1,
    };
    
    localStorage.setItem(STORAGE_KEYS.COMPLETED_STAGES, JSON.stringify(completed));
    
    // Update XP
    updatePlayerXP(score || 10);
    
    return true;
  } catch (error) {
    console.error('Error completing stage:', error);
    return false;
  }
};

// Check if stage is completed
export const isStageCompleted = (worldId, zoneId, stageId) => {
  const completed = getCompletedStages();
  const key = `${worldId}_${zoneId}_${stageId}`;
  return completed[key]?.completed || false;
};

// Get world progress
export const getWorldProgress = (worldId) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WORLD_PROGRESS);
    const allProgress = data ? JSON.parse(data) : {};
    return allProgress[worldId] || { visited: false, progress: 0 };
  } catch (error) {
    console.error('Error reading world progress:', error);
    return { visited: false, progress: 0 };
  }
};

// Update world progress
export const updateWorldProgress = (worldId, progress) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WORLD_PROGRESS);
    const allProgress = data ? JSON.parse(data) : {};
    
    allProgress[worldId] = {
      visited: true,
      progress: Math.min(progress, 100),
      lastVisited: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEYS.WORLD_PROGRESS, JSON.stringify(allProgress));
    return true;
  } catch (error) {
    console.error('Error updating world progress:', error);
    return false;
  }
};

// Update player XP
export const updatePlayerXP = (xpGain) => {
  try {
    const player = getPlayerData();
    const newXP = (player.xp || 0) + xpGain;
    const newLevel = Math.floor(newXP / 500) + 1;
    
    player.xp = newXP;
    player.level = newLevel;
    
    savePlayerData(player);
    return player;
  } catch (error) {
    console.error('Error updating XP:', error);
    return null;
  }
};

// Add badge
export const addBadge = (badgeId, badgeName) => {
  try {
    const player = getPlayerData();
    if (!player.badges) player.badges = [];
    
    if (!player.badges.find(b => b.id === badgeId)) {
      player.badges.push({
        id: badgeId,
        name: badgeName,
        earnedAt: new Date().toISOString(),
      });
    }
    
    savePlayerData(player);
    return true;
  } catch (error) {
    console.error('Error adding badge:', error);
    return false;
  }
};

// Get quiz scores
export const getQuizScores = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading quiz scores:', error);
    return [];
  }
};

// Save quiz score
export const saveQuizScore = (worldId, zoneId, stageId, score, totalQuestions) => {
  try {
    const scores = getQuizScores();
    scores.push({
      worldId,
      zoneId,
      stageId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      timestamp: new Date().toISOString(),
    });
    
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
    return true;
  } catch (error) {
    console.error('Error saving quiz score:', error);
    return false;
  }
};

// Get player stats
export const getPlayerStats = () => {
  try {
    const player = getPlayerData();
    const completedStages = getCompletedStages();
    const quizScores = getQuizScores();
    
    const totalStagesCompleted = Object.values(completedStages).filter(s => s.completed).length;
    const averageScore = quizScores.length > 0
      ? Math.round(quizScores.reduce((sum, s) => sum + s.percentage, 0) / quizScores.length)
      : 0;
    
    return {
      totalXP: player.xp || 0,
      level: player.level || 1,
      totalBadges: player.badges?.length || 0,
      totalStagesCompleted,
      averageQuizScore: averageScore,
      totalQuizzes: quizScores.length,
    };
  } catch (error) {
    console.error('Error getting player stats:', error);
    return {
      totalXP: 0,
      level: 1,
      totalBadges: 0,
      totalStagesCompleted: 0,
      averageQuizScore: 0,
      totalQuizzes: 0,
    };
  }
};

// Clear all data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.setItem(STORAGE_KEYS.PLAYER_DATA, JSON.stringify(DEFAULT_PLAYER));
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Export reset function
export const resetPlayerProgress = () => {
  try {
    const keysToReset = [
      STORAGE_KEYS.COMPLETED_STAGES,
      STORAGE_KEYS.WORLD_PROGRESS,
      STORAGE_KEYS.QUIZ_SCORES,
    ];
    keysToReset.forEach(key => localStorage.removeItem(key));
    
    const player = getPlayerData();
    player.xp = 0;
    player.level = 1;
    player.badges = [];
    savePlayerData(player);
    
    return true;
  } catch (error) {
    console.error('Error resetting progress:', error);
    return false;
  }
};
