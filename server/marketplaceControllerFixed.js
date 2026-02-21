const { getMockMarketplaceData } = require('../utils/mockData');

const marketplaceOffers = getMockMarketplaceData().offers;
const donationOptions = getMockMarketplaceData().donations;

const getMarketplaceOffers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        offers: marketplaceOffers,
        donations: donationOptions
      }
    });
  } catch (error) {
    console.error('Marketplace error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching marketplace offers'
    });
  }
};

const redeemOffer = async (req, res) => {
  try {
    const { userId, offerId, type } = req.body;
    
    // Mock user data - in real app this would come from database
    const mockUser = { ecoCredits: 150, carbonCredits: 2.5 };
    
    let offer;
    if (type === 'marketplace') {
      offer = marketplaceOffers.find(o => o.id === offerId);
      if (!offer || mockUser.ecoCredits < offer.ecoCreditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits or offer not found'
        });
      }
      
      mockUser.ecoCredits -= offer.ecoCreditsRequired;
    } else if (type === 'donation') {
      offer = donationOptions.find(o => o.id === offerId);
      if (!offer) {
        return res.status(400).json({
          success: false,
          message: 'Donation option not found'
        });
      }
      
      if (mockUser.ecoCredits < offer.ecoCreditsRequired || mockUser.carbonCredits < offer.carbonCreditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits for donation'
        });
      }
      
      mockUser.ecoCredits -= offer.ecoCreditsRequired;
      mockUser.carbonCredits -= offer.carbonCreditsRequired;
    }
    
    res.status(200).json({
      success: true,
      message: 'Offer redeemed successfully',
      data: {
        remainingEcoCredits: mockUser.ecoCredits,
        remainingCarbonCredits: mockUser.carbonCredits
      }
    });
    
  } catch (error) {
    console.error('Redeem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during redemption'
    });
  }
};

module.exports = {
  getMarketplaceOffers,
  redeemOffer
};
