const Device = require('../models/Device');
const Transaction = require('../models/Transaction');
const Credit = require('../models/Credit');
const User = require('../models/User');
const { generateTransactionHash, calculateCO2Footprint, calculateCredits } = require('../utils/blockchain');

const depositDevice = async (req, res) => {
  try {
    const { userId, deviceType, brand, model, condition, age } = req.body;
    
    // Calculate estimates based on device information
    const deviceTypeValues = {
      'Smartphone': { baseCredits: 50, baseValue: 2000, multiplier: 1.2 },
      'Laptop': { baseCredits: 100, baseValue: 8000, multiplier: 1.5 },
      'Tablet': { baseCredits: 75, baseValue: 4000, multiplier: 1.3 },
      'Desktop': { baseCredits: 150, baseValue: 12000, multiplier: 1.4 },
      'Monitor': { baseCredits: 80, baseValue: 3000, multiplier: 1.1 },
      'Printer': { baseCredits: 60, baseValue: 2500, multiplier: 1.0 },
      'Router': { baseCredits: 30, baseValue: 800, multiplier: 0.8 },
      'Keyboard': { baseCredits: 20, baseValue: 500, multiplier: 0.6 },
      'Mouse': { baseCredits: 15, baseValue: 300, multiplier: 0.5 },
      'Speaker': { baseCredits: 25, baseValue: 600, multiplier: 0.7 },
      'Camera': { baseCredits: 40, baseValue: 1500, multiplier: 0.9 },
      'Other': { baseCredits: 35, baseValue: 1000, multiplier: 1.0 }
    };

    const conditionMultipliers = {
      'Excellent': 1.0,
      'Good': 0.8,
      'Fair': 0.6,
      'Poor': 0.4
    };

    const ageDepreciation = Math.max(0.3, 1 - (parseInt(age) * 0.1));
    const deviceInfo = deviceTypeValues[deviceType] || deviceTypeValues['Other'];
    const conditionMultiplier = conditionMultipliers[condition] || 0.6;

    const estimatedCredits = Math.round(
      deviceInfo.baseCredits * 
      deviceInfo.multiplier * 
      conditionMultiplier * 
      ageDepreciation
    );

    const estimatedValue = Math.round(
      deviceInfo.baseValue * 
      conditionMultiplier * 
      ageDepreciation
    );

    const carbonCredits = (estimatedCredits * 0.1).toFixed(1);

    // Generate a mock device ID
    const deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Handle file upload if present
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    res.status(200).json({
      success: true,
      data: {
        deviceId,
        deviceType,
        brand,
        model,
        condition,
        age,
        imageUrl,
        ecoCreditsEarned: estimatedCredits,
        carbonCreditsEarned: parseFloat(carbonCredits),
        estimatedValue: estimatedValue,
        transactionHash: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'Completed',
        createdAt: new Date()
      }
    });
    
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during device deposit'
    });
  }
};

module.exports = {
  depositDevice
};
