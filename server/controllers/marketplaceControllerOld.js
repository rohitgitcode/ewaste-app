const { getMockMarketplaceData } = require('../utils/mockData');

const marketplaceOffers = getMockMarketplaceData().offers;
  {
    id: 1,
    title: "Eco-Friendly Shopping Bag",
    description: "Reusable shopping bag made from recycled materials",
    ecoCreditsRequired: 50,
    partner: "Green Earth Co.",
    category: "Merchandise",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: 2,
    title: "Plant a Tree Certificate",
    description: "Certificate for planting a tree in your name",
    ecoCreditsRequired: 100,
    partner: "Forest Foundation",
    category: "Environmental",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: 3,
    title: "Solar Power Bank",
    description: "Portable solar charger for your devices",
    ecoCreditsRequired: 200,
    partner: "SolarTech",
    category: "Electronics",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: 4,
    title: "Eco Warrior Badge",
    description: "Digital badge for your profile",
    ecoCreditsRequired: 25,
    partner: "E-Waste Recycling",
    category: "Digital",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: 5,
    title: "Organic Food Coupon",
    description: "$10 off organic groceries",
    ecoCreditsRequired: 75,
    partner: "Organic Market",
    category: "Food",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: 6,
    title: "Bicycle Rental Pass",
    description: "One month free bicycle sharing",
    ecoCreditsRequired: 150,
    partner: "City Bikes",
    category: "Transportation",
    imageUrl: "/api/placeholder/200/150"
  }
];

const donationOptions = [
  {
    id: 1,
    title: "Environmental Education Fund",
    description: "Support environmental education in schools",
    ecoCreditsRequired: 0,
    carbonCreditsRequired: 1,
    organization: "Green Education Initiative",
    category: "Education"
  },
  {
    id: 2,
    title: "Ocean Cleanup Project",
    description: "Help fund ocean plastic cleanup efforts",
    ecoCreditsRequired: 100,
    carbonCreditsRequired: 0,
    organization: "Ocean Guardians",
    category: "Environment"
  },
  {
    id: 3,
    title: "Renewable Energy Research",
    description: "Support renewable energy research",
    ecoCreditsRequired: 0,
    carbonCreditsRequired: 2,
    organization: "Clean Energy Lab",
    category: "Research"
  }
];

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
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    let offer;
    if (type === 'marketplace') {
      offer = marketplaceOffers.find(o => o.id === offerId);
      if (!offer || user.ecoCredits < offer.ecoCreditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits or offer not found'
        });
      }
      
      user.ecoCredits -= offer.ecoCreditsRequired;
    } else if (type === 'donation') {
      offer = donationOptions.find(o => o.id === offerId);
      if (!offer) {
        return res.status(400).json({
          success: false,
          message: 'Donation option not found'
        });
      }
      
      if (user.ecoCredits < offer.ecoCreditsRequired || user.carbonCredits < offer.carbonCreditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits for donation'
        });
      }
      
      user.ecoCredits -= offer.ecoCreditsRequired;
      user.carbonCredits -= offer.carbonCreditsRequired;
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Offer redeemed successfully',
      data: {
        remainingEcoCredits: user.ecoCredits,
        remainingCarbonCredits: user.carbonCredits
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
