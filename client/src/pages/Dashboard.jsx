import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { API_ENDPOINTS } from '../config/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { t } = useLanguage();
  const [userData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchLeaderboard();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USER_CREDITS);
      const data = await response.json();
      
      if (data.success) {
        setUserData(data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.LEADERBOARD);
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>{t('dashboard.title')}</h1>
          <p>Track your eco-credits and environmental impact</p>
        </div>

        {userData && (
          <div className="dashboard-content">
            <div className="credits-overview">
              <div className="overview-cards">
                <div className="credit-card eco-credits">
                  <div className="card-header">
                    <h3>{t('dashboard.ecoCredits')}</h3>
                    <div className="credit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="credit-amount">{userData.user.ecoCredits}</div>
                  <div className="credit-label">Eco Credits</div>
                </div>

                <div className="credit-card carbon-credits">
                  <div className="card-header">
                    <h3>{t('dashboard.carbonCredits')}</h3>
                    <div className="credit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="credit-amount">{userData.user.carbonCredits}</div>
                  <div className="credit-label">Carbon Credits</div>
                </div>

                <div className="credit-card level">
                  <div className="card-header">
                    <h3>{t('dashboard.level')}</h3>
                    <div className="credit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="credit-amount">{userData.user.level}</div>
                  <div className="credit-label">Current Level</div>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="badges-section">
                <div className="section-card">
                  <h3>{t('dashboard.badges')}</h3>
                  <div className="badges-list">
                    {userData.user.badges.length > 0 ? (
                      userData.user.badges.map((badge, index) => (
                        <div key={index} className="badge-item">
                          <span className="badge-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17h4v-2.34a4 4 0 1 0-4 0z"></path>
                          </svg>
                        </span>
                          <span className="badge-name">{badge}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-badges">No badges earned yet. Start recycling to earn your first badge!</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="history-section">
                <div className="section-card">
                  <h3>{t('dashboard.history')}</h3>
                  <div className="history-list">
                    {userData.creditHistory.slice(0, 5).map((credit, index) => (
                      <div key={index} className="history-item">
                        <div className="history-info">
                          <div className="history-source">{credit.source}</div>
                          <div className="history-date">
                            {new Date(credit.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="history-amount">
                          +{credit.amount} {credit.type === 'eco' ? 'Eco' : 'Carbon'} Credits
                        </div>
                      </div>
                    ))}
                    {userData.creditHistory.length === 0 && (
                      <p className="no-history">No transactions yet. Deposit your first device to start earning credits!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="actions-section">
              <div className="action-cards">
                <Link to="/deposit" className="action-card">
                  <div className="action-icon">
                    <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop&crop=center" alt="Deposit device" />
                  </div>
                  <h4>Deposit Device</h4>
                  <p>Register a new device for recycling</p>
                </Link>

                <Link to="/marketplace" className="action-card">
                  <div className="action-icon">
                    <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&crop=center" alt="Redeem credits" />
                  </div>
                  <h4>{t('dashboard.redeem')}</h4>
                  <p>Exchange credits for rewards</p>
                </Link>

                <Link to="/impact" className="action-card">
                  <div className="action-icon">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop&crop=center" alt="View impact" />
                  </div>
                  <h4>View Impact</h4>
                  <p>See your environmental contribution</p>
                </Link>
              </div>
            </div>

            <div className="leaderboard-section">
              <div className="section-card">
                <h3>Top Recyclers</h3>
                <div className="leaderboard-list">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div key={user._id} className={`leaderboard-item ${user.name === userData.user.name ? 'current-user' : ''}`}>
                      <div className="rank">#{index + 1}</div>
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-level">Level {user.level}</div>
                      </div>
                      <div className="user-credits">{user.ecoCredits} Eco Credits</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
