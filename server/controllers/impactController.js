const { getMockImpactStats, getMockLeaderboard } = require('../utils/mockData');

const getImpactStats = async (req, res) => {
  try {
    // Always use mock data for now to ensure reliability
    const mockStats = getMockImpactStats();
    res.status(200).json({
      success: true,
      data: mockStats
    });
  } catch (error) {
    console.error('Impact stats error:', error);
    // Fallback to mock data on error
    const mockStats = getMockImpactStats();
    res.status(200).json({
      success: true,
      data: mockStats
    });
  }
};

const getCommunityLeaderboard = async (req, res) => {
  try {
    // Always use mock data for now to ensure reliability
    const mockLeaderboard = getMockLeaderboard();
    res.status(200).json({
      success: true,
      data: mockLeaderboard
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    // Fallback to mock data on error
    const mockLeaderboard = getMockLeaderboard();
    res.status(200).json({
      success: true,
      data: mockLeaderboard
    });
  }
};

module.exports = {
  getImpactStats,
  getCommunityLeaderboard
};
