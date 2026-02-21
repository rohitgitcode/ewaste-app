import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import '../styles/Marketplace.css';

const Marketplace = () => {
  const { t } = useLanguage();
  const [marketplaceData, setMarketplaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState({ ecoCredits: 0, carbonCredits: 0 });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchMarketplaceData();
    fetchUserCredits();
  }, []);

  const fetchMarketplaceData = async () => {
    try {
      const response = await fetch('/api/marketplace');
      const data = await response.json();
      
      if (data.success) {
        setMarketplaceData(data.data);
      }
    } catch (error) {
      console.error('Error fetching marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCredits = async () => {
    try {
      const response = await fetch('/api/credits/user/demo-user');
      const data = await response.json();
      
      if (data.success) {
        setUserCredits({
          ecoCredits: data.data.user.ecoCredits,
          carbonCredits: data.data.user.carbonCredits
        });
      }
    } catch (error) {
      console.error('Error fetching user credits:', error);
    }
  };

  const handleRedeem = async (offerId, type) => {
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/marketplace/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'demo-user',
          offerId,
          type
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Offer redeemed successfully!');
        setMessageType('success');
        setUserCredits({
          ecoCredits: data.data.remainingEcoCredits,
          carbonCredits: data.data.remainingCarbonCredits
        });
      } else {
        setMessage(data.message || 'Failed to redeem offer');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Redemption error:', error);
      setMessage('Network error. Please try again.');
      setMessageType('error');
    }
  };

  if (loading) {
    return (
      <div className="marketplace">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!marketplaceData) {
    return (
      <div className="marketplace">
        <div className="container">
          <div className="error">
            Failed to load marketplace data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace">
      <div className="container">
        <div className="marketplace-header">
          <h1>{t('marketplace.title')}</h1>
          <div className="credits-display">
            <div className="credit-balance eco">
              <span className="credit-icon">🌱</span>
              <span className="credit-amount">{userCredits.ecoCredits}</span>
              <span className="credit-label">Eco Credits</span>
            </div>
            <div className="credit-balance carbon">
              <span className="credit-icon">⚡</span>
              <span className="credit-amount">{userCredits.carbonCredits}</span>
              <span className="credit-label">Carbon Credits</span>
            </div>
          </div>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="marketplace-content">
          <section className="offers-section">
            <h2>{t('marketplace.offers')}</h2>
            <div className="offers-grid">
              {marketplaceData?.offers?.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-image">
                    <img src={offer.imageUrl} alt={offer.title} />
                  </div>
                  <div className="offer-content">
                    <div className="offer-category">{offer.category}</div>
                    <h3 className="offer-title">{offer.title}</h3>
                    <p className="offer-description">{offer.description}</p>
                    <div className="offer-partner">Partner: {offer.partner}</div>
                    <div className="offer-cost">
                      <span className="cost-amount">{offer.ecoCreditsRequired}</span>
                      <span className="cost-label">Eco Credits</span>
                    </div>
                    <button
                      className={`btn ${userCredits.ecoCredits >= offer.ecoCreditsRequired ? 'btn-primary' : 'btn-disabled'}`}
                      onClick={() => handleRedeem(offer.id, 'marketplace')}
                      disabled={userCredits.ecoCredits < offer.ecoCreditsRequired}
                    >
                      {userCredits.ecoCredits >= offer.ecoCreditsRequired ? t('marketplace.redeem') : 'Insufficient Credits'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="donations-section">
            <h2>{t('marketplace.donations')}</h2>
            <div className="donations-grid">
              {marketplaceData?.donations?.map((donation) => (
                <div key={donation.id} className="donation-card">
                  <div className="donation-header">
                    <div className="donation-icon">💚</div>
                    <h3 className="donation-title">{donation.title}</h3>
                  </div>
                  <p className="donation-description">{donation.description}</p>
                  <div className="donation-organization">Organization: {donation.organization}</div>
                  <div className="donation-costs">
                    {donation.ecoCreditsRequired > 0 && (
                      <div className="cost-item">
                        <span className="cost-amount">{donation.ecoCreditsRequired}</span>
                        <span className="cost-label">Eco Credits</span>
                      </div>
                    )}
                    {donation.carbonCreditsRequired > 0 && (
                      <div className="cost-item">
                        <span className="cost-amount">{donation.carbonCreditsRequired}</span>
                        <span className="cost-label">Carbon Credits</span>
                      </div>
                    )}
                  </div>
                  <button
                    className={`btn ${(userCredits.ecoCredits >= donation.ecoCreditsRequired && userCredits.carbonCredits >= donation.carbonCreditsRequired) ? 'btn-primary' : 'btn-disabled'}`}
                    onClick={() => handleRedeem(donation.id, 'donation')}
                    disabled={userCredits.ecoCredits < donation.ecoCreditsRequired || userCredits.carbonCredits < donation.carbonCreditsRequired}
                  >
                    {(userCredits.ecoCredits >= donation.ecoCreditsRequired && userCredits.carbonCredits >= donation.carbonCreditsRequired) ? 'Donate' : 'Insufficient Credits'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
