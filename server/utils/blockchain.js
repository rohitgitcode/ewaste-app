const crypto = require('crypto');

const generateTransactionHash = () => {
  const timestamp = Date.now().toString();
  const randomData = crypto.randomBytes(32).toString('hex');
  const combinedData = timestamp + randomData;
  
  return crypto.createHash('sha256').update(combinedData).digest('hex');
};

const calculateCO2Footprint = (deviceType, condition, age) => {
  const baseFootprint = {
    'Laptop': 300,
    'Phone': 50,
    'Tablet': 100,
    'Desktop': 500
  };
  
  const conditionMultiplier = {
    'Excellent': 1.0,
    'Good': 0.9,
    'Fair': 0.7,
    'Poor': 0.5
  };
  
  const ageMultiplier = Math.max(0.3, 1 - (age * 0.1));
  
  const base = baseFootprint[deviceType] || 100;
  return Math.round(base * conditionMultiplier[condition] * ageMultiplier);
};

const calculateCredits = (co2Footprint) => {
  const carbonCredits = (co2Footprint / 1000).toFixed(2);
  const ecoCredits = Math.floor(co2Footprint / 10);
  const marketValue = (co2Footprint * 0.015).toFixed(2);
  
  return {
    carbonCredits: parseFloat(carbonCredits),
    ecoCredits,
    marketValue: parseFloat(marketValue)
  };
};

module.exports = {
  generateTransactionHash,
  calculateCO2Footprint,
  calculateCredits
};
