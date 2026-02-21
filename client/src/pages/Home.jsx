import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import '../styles/Home.css';

const Home = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalDevices: 0,
    totalCO2: 0,
    totalEcoCredits: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/impact/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalDevices: data.data.totalDevices,
          totalCO2: data.data.totalCO2Avoided,
          totalEcoCredits: data.data.totalEcoCredits,
          totalUsers: data.data.totalUsers
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-image-overlay">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&crop=center" alt="E-Waste Recycling" className="hero-bg-image" />
            <div className="hero-overlay"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-icon">♻️</span>
                <span>Join the Green Revolution</span>
              </div>
              <h1>
                <span className="hero-title-main">Recycle E-Waste</span>
                <span className="hero-title-accent">Earn Credits</span>
                <span className="hero-title-main">Save the Planet</span>
              </h1>
              <p className="hero-description">
                Transform your old electronics into valuable rewards while protecting our environment. 
                Join thousands making a difference, one device at a time.
              </p>
              <div className="hero-buttons">
                <Link to="/deposit" className="btn btn-primary btn-large hero-btn">
                  <span className="btn-icon"></span>
                  {t('home.hero.depositNow')}
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-large hero-btn">
                  <span className="btn-icon"></span>
                  {t('home.hero.trackCredits')}
                </Link>
                <Link to="/about" className="btn btn-outline btn-large hero-btn">
                  <span className="btn-icon"></span>
                  {t('home.hero.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                <div className="stat-card">
                  <div className="stat-number">{formatNumber(stats.totalDevices)}</div>
                  <div className="stat-label">{t('home.stats.totalRecycled')}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{formatNumber(stats.totalCO2)} kg</div>
                  <div className="stat-label">{t('home.stats.co2Avoided')}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{formatNumber(stats.totalEcoCredits)}</div>
                  <div className="stat-label">{t('home.stats.creditsIssued')}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{formatNumber(stats.totalUsers)}</div>
                  <div className="stat-label">{t('home.stats.activeUsers')}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3>Register Device</h3>
              <p>Submit details about your electronic device for recycling</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M21 12h-6m-6 0H3m13.22 4.22l4.24 4.24M1.54 20.46l4.24-4.24"></path>
                </svg>
              </div>
              <h3>Get Valued</h3>
              <p>Receive instant valuation based on device type and condition</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3>Earn Credits</h3>
              <p>Get eco-credits and carbon credits for your contribution</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3>Redeem Rewards</h3>
              <p>Exchange credits for eco-friendly products and services</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of users who are already contributing to a sustainable future.</p>
            <Link to="/deposit" className="btn btn-primary btn-large">
              Start Recycling Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
