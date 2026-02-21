const getMockMarketplaceData = () => ({
  offers: [
    {
      id: 1,
      title: "Eco-Friendly Shopping Bag",
      description: "Reusable shopping bag made from recycled materials",
      ecoCreditsRequired: 50,
      partner: "Green Earth Co.",
      category: "Merchandise",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Plant a Tree Certificate",
      description: "Certificate for planting a tree in your name",
      ecoCreditsRequired: 100,
      partner: "Forest Foundation",
      category: "Environmental",
      imageUrl: "https://images.unsplash.com/photo-1546587348-d12660bb30c4?w=200&h=150&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Solar Power Bank",
      description: "Portable solar charger for your devices",
      ecoCreditsRequired: 200,
      partner: "SolarTech",
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1593672714497-e6845d8b4f0b?w=200&h=150&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Eco Warrior Badge",
      description: "Digital badge for your profile",
      ecoCreditsRequired: 25,
      partner: "E-Waste Recycling",
      category: "Digital",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=150&fit=crop"
    },
    {
      id: 5,
      title: "Organic Food Coupon",
      description: "$10 off organic groceries",
      ecoCreditsRequired: 75,
      partner: "Organic Market",
      category: "Food",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop"
    },
    {
      id: 6,
      title: "Bicycle Rental Pass",
      description: "One month free bicycle sharing",
      ecoCreditsRequired: 150,
      partner: "City Bikes",
      category: "Transportation",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop"
    }
  ],
  donations: [
    {
      id: 1,
      title: "Ocean Cleanup Fund",
      description: "Support ocean plastic removal initiatives",
      ecoCreditsRequired: 100,
      carbonCreditsRequired: 2,
      organization: "Ocean Conservation Society",
      category: "Environment",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Tree Planting Drive",
      description: "Help plant trees in urban areas",
      ecoCreditsRequired: 50,
      carbonCreditsRequired: 1,
      organization: "Green Earth Foundation",
      category: "Environment",
      imageUrl: "https://images.unsplash.com/photo-1546587348-d12660bb30c4?w=200&h=150&fit=crop"
    },
    {
      id: 3,
      title: "Wildlife Protection",
      description: "Support endangered species conservation",
      ecoCreditsRequired: 200,
      carbonCreditsRequired: 4,
      organization: "Wildlife Conservation Trust",
      category: "Wildlife",
      imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=200&h=150&fit=crop"
    },
    {
      id: 4,
      title: "Renewable Energy",
      description: "Fund renewable energy projects",
      ecoCreditsRequired: 150,
      carbonCreditsRequired: 3,
      organization: "Clean Energy Initiative",
      category: "Energy",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=150&fit=crop"
    }
  ]
});

const getMockUserData = () => ({
  user: {
    name: "Demo User",
    email: "demo@ewaste.com",
    ecoCredits: 150,
    carbonCredits: 2.5,
    level: 3,
    badges: ["First Recycler", "Eco Warrior"],
    createdAt: new Date('2024-01-15')
  },
  creditHistory: [
    {
      source: "Device recycling: Laptop",
      type: "eco",
      amount: 30,
      createdAt: new Date('2024-01-20')
    },
    {
      source: "Device recycling: Phone",
      type: "carbon",
      amount: 0.05,
      createdAt: new Date('2024-01-18')
    }
  ],
  deviceHistory: [
    {
      deviceType: "Laptop",
      brand: "Dell",
      model: "XPS 15",
      condition: "Good",
      age: 3,
      co2Footprint: 270,
      createdAt: new Date('2024-01-20')
    },
    {
      deviceType: "Phone",
      brand: "Apple",
      model: "iPhone 12",
      condition: "Excellent",
      age: 1,
      co2Footprint: 50,
      createdAt: new Date('2024-01-18')
    }
  ]
});

const getMockImpactStats = () => ({
  totalDevices: 1247,
  totalCO2Avoided: 156789,
  totalEcoCredits: 15420,
  totalCarbonCredits: 387.5,
  totalUsers: 892,
  deviceTypeStats: [
    { _id: "Laptop", count: 456 },
    { _id: "Phone", count: 523 },
    { _id: "Tablet", count: 189 },
    { _id: "Desktop", count: 79 }
  ],
  monthlyStats: [
    { _id: { year: 2024, month: 1 }, devices: 89, co2: 12340 },
    { _id: { year: 2024, month: 2 }, devices: 92, co2: 12890 },
    { _id: { year: 2024, month: 3 }, devices: 104, co2: 14560 },
    { _id: { year: 2024, month: 4 }, devices: 98, co2: 13720 },
    { _id: { year: 2024, month: 5 }, devices: 112, co2: 15680 },
    { _id: { year: 2024, month: 6 }, devices: 125, co2: 17500 },
    { _id: { year: 2024, month: 7 }, devices: 108, co2: 15120 },
    { _id: { year: 2024, month: 8 }, devices: 95, co2: 13300 },
    { _id: { year: 2024, month: 9 }, devices: 87, co2: 12150 },
    { _id: { year: 2024, month: 10 }, devices: 93, co2: 12950 },
    { _id: { year: 2024, month: 11 }, devices: 101, co2: 14080 },
    { _id: { year: 2024, month: 12 }, devices: 143, co2: 19970 }
  ]
});

const getMockLeaderboard = () => [
  { _id: "user1", name: "Alice Green", ecoCredits: 450, carbonCredits: 8.5, level: 5, badges: ["First Recycler", "Eco Warrior", "Green Champion"] },
  { _id: "user2", name: "Bob Eco", ecoCredits: 380, carbonCredits: 7.2, level: 4, badges: ["First Recycler", "Eco Warrior"] },
  { _id: "user3", name: "Carol Earth", ecoCredits: 320, carbonCredits: 6.1, level: 4, badges: ["First Recycler", "Eco Warrior"] },
  { _id: "user4", name: "David Recycle", ecoCredits: 290, carbonCredits: 5.5, level: 3, badges: ["First Recycler"] },
  { _id: "user5", name: "Eva Nature", ecoCredits: 260, carbonCredits: 4.8, level: 3, badges: ["First Recycler"] }
];

module.exports = {
  getMockMarketplaceData,
  getMockUserData,
  getMockImpactStats,
  getMockLeaderboard
};
