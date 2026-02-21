const express = require('express');
const { getUserCredits, getLeaderboard } = require('../controllers/creditsController');

const router = express.Router();

router.get('/user/:userId', getUserCredits);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
