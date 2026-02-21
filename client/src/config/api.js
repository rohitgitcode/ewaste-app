// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ewaste-app-izge.onrender.com/api';

export const API_ENDPOINTS = {
  // Base URL
  BASE: API_BASE_URL,
  
  // Endpoints
  DEPOSIT: `${API_BASE_URL}/deposit`,
  CREDITS: `${API_BASE_URL}/credits`,
  MARKETPLACE: `${API_BASE_URL}/marketplace`,
  IMPACT: `${API_BASE_URL}/impact`,
  HEALTH: `${API_BASE_URL}/health`,
  PLACEHOLDER: (width, height) => `${API_BASE_URL}/placeholder/${width}/${height}`,
  
  // User-specific endpoints
  USER_CREDITS: `${API_BASE_URL}/credits/user/demo-user`,
  LEADERBOARD: `${API_BASE_URL}/credits/leaderboard`,
  IMPACT_STATS: `${API_BASE_URL}/impact/stats`,
  IMPACT_LEADERBOARD: `${API_BASE_URL}/impact/leaderboard`,
  MARKETPLACE_REDEEM: `${API_BASE_URL}/marketplace/redeem`,
};

export default API_ENDPOINTS;
