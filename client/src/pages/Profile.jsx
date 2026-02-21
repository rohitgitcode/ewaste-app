import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import '../styles/Profile.css';

const Profile = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/credits/user/demo-user');
      const data = await response.json();
      
      if (data.success) {
        setUserData(data.data);
        setFormData({
          name: data.data.user.name,
          email: data.data.user.email,
          avatar: data.data.user.avatar
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        name: userData.user.name,
        email: userData.user.email,
        avatar: userData.user.avatar
      });
    }
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="profile">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile">
        <div className="container">
          <div className="error">
            Failed to load user data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1>{t('profile.title')}</h1>
          <div className="profile-summary">
            <div className="avatar-section">
              <div className="avatar">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile" />
                ) : (
                  <div className="avatar-placeholder">👤</div>
                )}
              </div>
              <div className="level-badge">Level {userData?.user?.level || 1}</div>
            </div>
            <div className="user-info">
              <h2>{userData?.user?.name || 'User'}</h2>
              <p>{userData?.user?.email || 'user@example.com'}</p>
              <div className="credits-summary">
                <div className="credit-item">
                  <span className="credit-icon">🌱</span>
                  <span className="credit-amount">{userData?.user?.ecoCredits || 0}</span>
                  <span className="credit-label">Eco Credits</span>
                </div>
                <div className="credit-item">
                  <span className="credit-icon">⚡</span>
                  <span className="credit-amount">{userData?.user?.carbonCredits || 0}</span>
                  <span className="credit-label">Carbon Credits</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              {t('profile.personalInfo')}
            </button>
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              {t('profile.recyclingHistory')}
            </button>
            <button
              className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              {t('profile.settings')}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'personal' && (
              <div className="personal-info">
                <div className="section-header">
                  <h3>{t('profile.personalInfo')}</h3>
                  {!editMode && (
                    <button className="btn btn-secondary" onClick={() => setEditMode(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>
                
                {editMode ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="avatar">Avatar URL</label>
                      <input
                        type="text"
                        id="avatar"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                      </button>
                      <button className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-display">
                    <div className="info-item">
                      <label>Name:</label>
                      <span>{userData?.user?.name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{userData?.user?.email || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Member Since:</label>
                      <span>{new Date(userData?.user?.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                      <label>Current Level:</label>
                      <span>{userData?.user?.level || 1}</span>
                    </div>
                    <div className="info-item">
                      <label>Badges Earned:</label>
                      <div className="badges-display">
                        {(userData?.user?.badges?.length || 0) > 0 ? (
                          userData.user.badges.map((badge, index) => (
                            <span key={index} className="badge">{badge}</span>
                          ))
                        ) : (
                          <span className="no-badges">No badges earned yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="recycling-history">
                <h3>{t('profile.recyclingHistory')}</h3>
                
                <div className="history-sections">
                  <div className="history-section">
                    <h4>Device History</h4>
                    {(userData?.deviceHistory?.length || 0) > 0 ? (
                      <div className="history-list">
                        {userData.deviceHistory.map((device, index) => (
                          <div key={index} className="history-item">
                            <div className="device-info">
                              <div className="device-type">{device.deviceType}</div>
                              <div className="device-details">
                                {device.brand} {device.model} • {device.condition} • {device.age} years old
                              </div>
                            </div>
                            <div className="device-impact">
                              <div className="co2-avoided">{device.co2Footprint} kg CO₂ avoided</div>
                              <div className="date">{new Date(device.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-history">No devices recycled yet. Start by depositing your first device!</p>
                    )}
                  </div>

                  <div className="history-section">
                    <h4>Credit Transactions</h4>
                    {(userData?.creditHistory?.length || 0) > 0 ? (
                      <div className="history-list">
                        {userData.creditHistory.map((credit, index) => (
                          <div key={index} className="history-item">
                            <div className="credit-info">
                              <div className="credit-source">{credit.source}</div>
                              <div className="credit-type">{credit.type === 'eco' ? 'Eco Credits' : 'Carbon Credits'}</div>
                            </div>
                            <div className="credit-amount">
                              +{credit.amount} {credit.type === 'eco' ? 'Eco' : 'Carbon'} Credits
                            </div>
                            <div className="date">{new Date(credit.createdAt).toLocaleDateString()}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-history">No credit transactions yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings">
                <h3>{t('profile.settings')}</h3>
                
                <div className="settings-sections">
                  <div className="settings-section">
                    <h4>Appearance</h4>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>{t('profile.darkMode')}</label>
                        <p>Toggle between light and dark theme</p>
                      </div>
                      <div className="setting-control">
                        <button
                          className={`toggle-btn ${isDarkMode ? 'active' : ''}`}
                          onClick={toggleDarkMode}
                        >
                          <div className="toggle-slider"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h4>{t('profile.language')}</h4>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Language Preference</label>
                        <p>Choose your preferred language</p>
                      </div>
                      <div className="setting-control">
                        <select
                          value={language}
                          onChange={(e) => changeLanguage(e.target.value)}
                          className="language-select"
                        >
                          <option value="en">English</option>
                          <option value="hi">हिन्दी (Hindi)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h4>Notifications</h4>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Email Notifications</label>
                        <p>Receive updates about your recycling activities</p>
                      </div>
                      <div className="setting-control">
                        <button className="toggle-btn active">
                          <div className="toggle-slider"></div>
                        </button>
                      </div>
                    </div>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Marketing Emails</label>
                        <p>Receive offers and promotions from partners</p>
                      </div>
                      <div className="setting-control">
                        <button className="toggle-btn">
                          <div className="toggle-slider"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h4>Account</h4>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Delete Account</label>
                        <p>Permanently delete your account and all data</p>
                      </div>
                      <div className="setting-control">
                        <button className="btn btn-danger">Delete Account</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
