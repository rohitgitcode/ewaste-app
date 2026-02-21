const express = require('express');
const { getImpactStats, getCommunityLeaderboard } = require('../controllers/impactController');

const router = express.Router();

router.get('/stats', getImpactStats);
router.get('/leaderboard', getCommunityLeaderboard);

module.exports = router;
