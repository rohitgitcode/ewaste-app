const express = require('express');
const { getMarketplaceOffers, redeemOffer } = require('../controllers/marketplaceController');

const router = express.Router();

router.get('/', getMarketplaceOffers);
router.post('/redeem', redeemOffer);

module.exports = router;
