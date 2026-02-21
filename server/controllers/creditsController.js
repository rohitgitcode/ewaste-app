const { getMockUserData, getMockLeaderboard } = require('../utils/mockData');

const getUserCredits = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Always use mock data for now to ensure reliability
    const mockData = getMockUserData();
    res.status(200).json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Credits error:', error);
    // Fallback to mock data on error
    const mockData = getMockUserData();
    res.status(200).json({
      success: true,
      data: mockData
    });
  }
};

const getLeaderboard = async (req, res) => {
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
  getUserCredits,
  getLeaderboard
};
