import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      deposit: 'Deposit',
      dashboard: 'Dashboard',
      marketplace: 'Marketplace',
      impact: 'Impact',
      about: 'About',
      profile: 'Profile'
    },
    home: {
      hero: {
        title: 'Recycle E-Waste. Earn Credits. Save the Planet.',
        subtitle: 'Join the movement to reduce electronic waste and build a sustainable future.',
        depositNow: 'Deposit Now',
        trackCredits: 'Track Credits',
        learnMore: 'Learn More'
      },
      stats: {
        totalRecycled: 'Total E-Waste Recycled',
        co2Avoided: 'CO₂ Avoided',
        creditsIssued: 'Credits Issued',
        activeUsers: 'Active Users'
      }
    },
    deposit: {
      title: 'Deposit Your Device',
      deviceInfo: 'Device Information',
      deviceType: 'Device Type',
      brand: 'Brand',
      model: 'Model',
      condition: 'Condition',
      age: 'Age (years)',
      uploadImage: 'Upload Device Image',
      submit: 'Submit Device',
      results: {
        title: 'Deposit Results',
        deviceType: 'Device Type',
        co2Avoided: 'CO₂ Avoided',
        carbonCredits: 'Carbon Credits Earned',
        ecoCredits: 'Eco Credits Earned',
        marketValue: 'Market Value',
        transactionId: 'Transaction ID'
      }
    },
    dashboard: {
      title: 'Credits Dashboard',
      balance: 'Credit Balance',
      ecoCredits: 'Eco Credits',
      carbonCredits: 'Carbon Credits',
      level: 'Level',
      badges: 'Badges',
      history: 'Transaction History',
      redeem: 'Redeem Credits'
    },
    marketplace: {
      title: 'Marketplace',
      offers: 'Available Offers',
      donations: 'Donation Options',
      redeem: 'Redeem',
      ecoCreditsRequired: 'Eco Credits Required',
      carbonCreditsRequired: 'Carbon Credits Required'
    },
    impact: {
      title: 'Environmental Impact',
      communityStats: 'Community Statistics',
      leaderboard: 'Leaderboard',
      totalDevices: 'Total Devices Recycled',
      totalCO2: 'Total CO₂ Avoided',
      rank: 'Rank',
      name: 'Name',
      credits: 'Credits'
    },
    about: {
      title: 'About Us',
      mission: 'Our Mission',
      blockchain: 'Blockchain Transparency',
      howItWorks: 'How Carbon Credits Work',
      contact: 'Contact Us'
    },
    profile: {
      title: 'My Profile',
      personalInfo: 'Personal Information',
      recyclingHistory: 'Recycling History',
      settings: 'Settings',
      darkMode: 'Dark Mode',
      language: 'Language'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      deposit: 'जमा करें',
      dashboard: 'डैशबोर्ड',
      marketplace: 'मार्केटप्लेस',
      impact: 'प्रभाव',
      about: 'हमारे बारे में',
      profile: 'प्रोफाइल'
    },
    home: {
      hero: {
        title: 'ई-कचरा रिसाइकल करें। क्रेडिट कमाएं। ग्रह को बचाएं।',
        subtitle: 'इलेक्ट्रॉनिक कचरे को कम करने और एक स्थायी भविष्य बनाने की आंदोलन में शामिल हों।',
        depositNow: 'अभी जमा करें',
        trackCredits: 'क्रेडिट ट्रैक करें',
        learnMore: 'और जानें'
      },
      stats: {
        totalRecycled: 'कुल ई-कचरा रिसाइकल',
        co2Avoided: 'CO₂ बचाया गया',
        creditsIssued: 'क्रेडिट जारी',
        activeUsers: 'सक्रिय उपयोगकर्ता'
      }
    },
    deposit: {
      title: 'अपना डिवाइस जमा करें',
      deviceInfo: 'डिवाइस जानकारी',
      deviceType: 'डिवाइस प्रकार',
      brand: 'ब्रांड',
      model: 'मॉडल',
      condition: 'स्थिति',
      age: 'आयु (वर्ष)',
      uploadImage: 'डिवाइस छवि अपलोड करें',
      submit: 'डिवाइस जमा करें',
      results: {
        title: 'जमा परिणाम',
        deviceType: 'डिवाइस प्रकार',
        co2Avoided: 'CO₂ बचाया गया',
        carbonCredits: 'कार्बन क्रेडिट कमाए',
        ecoCredits: 'इको क्रेडिट कमाए',
        marketValue: 'बाजार मूल्य',
        transactionId: 'लेनदेन आईडी'
      }
    },
    dashboard: {
      title: 'क्रेडिट डैशबोर्ड',
      balance: 'क्रेडिट शेष',
      ecoCredits: 'इको क्रेडिट',
      carbonCredits: 'कार्बन क्रेडिट',
      level: 'स्तर',
      badges: 'बैज',
      history: 'लेनदेन इतिहास',
      redeem: 'क्रेडिट रिडीम करें'
    },
    marketplace: {
      title: 'मार्केटप्लेस',
      offers: 'उपलब्ध ऑफर',
      donations: 'दान विकल्प',
      redeem: 'रिडीम करें',
      ecoCreditsRequired: 'आवश्यक इको क्रेडिट',
      carbonCreditsRequired: 'आवश्यक कार्बन क्रेडिट'
    },
    impact: {
      title: 'पर्यावरणीय प्रभाव',
      communityStats: 'सामुदायिक आँकड़े',
      leaderboard: 'लीडरबोर्ड',
      totalDevices: 'कुल डिवाइस रिसाइकल',
      totalCO2: 'कुल CO₂ बचाया गया',
      rank: 'रैंक',
      name: 'नाम',
      credits: 'क्रेडिट'
    },
    about: {
      title: 'हमारे बारे में',
      mission: 'हमारा मिशन',
      blockchain: 'ब्लॉकचेन पारदर्शिता',
      howItWorks: 'कार्बन क्रेडिट कैसे काम करते हैं',
      contact: 'संपर्क करें'
    },
    profile: {
      title: 'मेरी प्रोफाइल',
      personalInfo: 'व्यक्तिगत जानकारी',
      recyclingHistory: 'रिसाइकलिंग इतिहास',
      settings: 'सेटिंग्स',
      darkMode: 'डार्क मोड',
      language: 'भाषा'
    }
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
