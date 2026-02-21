import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import '../styles/Impact.css';

const Impact = () => {
  const { t } = useLanguage();
  const [impactStats, setImpactStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImpactData();
  }, []);

  const fetchImpactData = async () => {
    try {
      const [statsResponse, leaderboardResponse] = await Promise.all([
        fetch('/api/impact/stats'),
        fetch('/api/impact/leaderboard')
      ]);

      const statsData = await statsResponse.json();
      const leaderboardData = await leaderboardResponse.json();

      if (statsData.success) {
        setImpactStats(statsData.data);
      }

      if (leaderboardData.success) {
        setLeaderboard(leaderboardData.data);
      }
    } catch (error) {
      console.error('Error fetching impact data:', error);
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

  if (loading) {
    return (
      <div className="impact">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!impactStats) {
    return (
      <div className="impact">
        <div className="container">
          <div className="error">
            Failed to load impact data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="impact">
      <div className="container">
        <div className="impact-header">
          <h1>{t('impact.title')}</h1>
          <p>Track our collective environmental impact and community achievements</p>
        </div>

        <section className="community-stats">
          <h2>{t('impact.communityStats')}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop&crop=center" alt="Electronic devices" />
              </div>
              <div className="stat-number">{formatNumber(impactStats?.totalDevices || 0)}</div>
              <div className="stat-label">{t('impact.totalDevices')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&h=80&fit=crop&crop=center" alt="Earth environment" />
              </div>
              <div className="stat-number">{formatNumber(impactStats?.totalCO2 || 0)} kg</div>
              <div className="stat-label">{t('impact.totalCO2')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop&crop=center" alt="Green energy" />
              </div>
              <div className="stat-number">{formatNumber(impactStats?.totalEcoCredits || 0)}</div>
              <div className="stat-label">Total Eco Credits</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=center" alt="Lightning energy" />
              </div>
              <div className="stat-number">{formatNumber(impactStats?.totalCarbonCredits || 0)}</div>
              <div className="stat-label">Total Carbon Credits</div>
            </div>
          </div>
        </section>

        <section className="device-breakdown">
          <h2>Device Types Recycled</h2>
          <div className="device-stats">
            {impactStats?.deviceTypeStats?.map((deviceType, index) => {
              const percentage = (impactStats?.totalDevices || 0) > 0 
                ? ((deviceType.count / (impactStats?.totalDevices || 1)) * 100).toFixed(1)
                : 0;
              
              return (
                <div key={deviceType._id} className="device-stat">
                  <div className="device-info">
                    <span className="device-name">{deviceType._id}</span>
                    <span className="device-count">{deviceType.count} devices</span>
                  </div>
                  <div className="device-bar">
                    <div 
                      className="device-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <span className="device-percentage">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="monthly-trends">
          <h2>Monthly Recycling Trends</h2>
          <div className="trends-chart">
            {impactStats?.monthlyStats?.map((month, index) => (
              <div key={`${month._id.year}-${month._id.month}`} className="month-bar">
                <div className="month-info">
                  <span className="month-name">
                    {new Date(month._id.year, month._id.month - 1).toLocaleDateString('en', { month: 'short' })}
                  </span>
                  <span className="month-devices">{month.devices} devices</span>
                </div>
                <div className="month-bar-container">
                  <div 
                    className="month-fill"
                    style={{ 
                      height: `${(month.devices / Math.max(...(impactStats?.monthlyStats?.map(m => m.devices) || [1]))) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="leaderboard-section">
          <h2>{t('impact.leaderboard')}</h2>
          <div className="leaderboard">
            <div className="leaderboard-header">
              <div className="header-rank">{t('impact.rank')}</div>
              <div className="header-name">{t('impact.name')}</div>
              <div className="header-level">Level</div>
              <div className="header-credits">{t('impact.credits')}</div>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((user, index) => (
                <div key={user._id} className="leaderboard-item">
                  <div className="rank">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-badges">
                      {user.badges.slice(0, 2).map((badge, i) => (
                        <span key={i} className="badge">{badge}</span>
                      ))}
                    </div>
                  </div>
                  <div className="user-level">
                    <span className="level-badge">Lvl {user.level}</span>
                  </div>
                  <div className="user-credits">
                    <div className="credit-amount">{user.ecoCredits}</div>
                    <div className="credit-label">Eco Credits</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="environmental-impact">
          <h2>Environmental Equivalents</h2>
          <div className="equivalents-grid">
            <div className="equivalent-card">
              <div className="equivalent-icon">🌳</div>
              <h3>Trees Planted Equivalent</h3>
              <div className="equivalent-number">
                {Math.round((impactStats?.totalCO2 || 0) / 21)} trees
              </div>
              <p>One tree absorbs ~21kg CO₂ per year</p>
            </div>
            <div className="equivalent-card">
              <div className="equivalent-icon">🚗</div>
              <h3>Car Miles Avoided</h3>
              <div className="equivalent-number">
                {Math.round((impactStats?.totalCO2 || 0) * 2.4)} miles
              </div>
              <p>Based on average car emissions</p>
            </div>
            <div className="equivalent-card">
              <div className="equivalent-icon">⚡</div>
              <h3>Energy Saved</h3>
              <div className="equivalent-number">
                {Math.round((impactStats?.totalCO2 || 0) * 1.5)} kWh
              </div>
              <p>Equivalent energy savings</p>
            </div>
            <div className="equivalent-card">
              <div className="equivalent-icon">💧</div>
              <h3>Water Conserved</h3>
              <div className="equivalent-number">
                {Math.round((impactStats?.totalCO2 || 0) * 100)} gallons
              </div>
              <p>Water saved through recycling</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Impact;
