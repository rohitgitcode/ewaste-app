import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import '../styles/Deposit.css';

const Deposit = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    userId: 'demo-user',
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    age: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    mobileNumber: '',
    location: '',
    pincode: '',
    deliveryDate: ''
  });

  const deviceTypes = ['Laptop', 'Phone', 'Tablet', 'Desktop'];
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeliveryInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const calculateEstimates = () => {
    // Safety checks
    if (!formData || !formData.deviceType || !formData.condition || !formData.age) {
      return {
        ecoCredits: 0,
        carbonCredits: 0,
        estimatedValue: 0
      };
    }

    const deviceTypeValues = {
      'Laptop': { baseCredits: 120, baseValue: 1000, multiplier: 1.5 },
      'Phone': { baseCredits: 60, baseValue: 250, multiplier: 1.2 },
      'Tablet': { baseCredits: 90, baseValue: 500, multiplier: 1.3 },
      'Desktop': { baseCredits: 180, baseValue: 1500, multiplier: 1.4 },
      'Monitor': { baseCredits: 96, baseValue: 375, multiplier: 1.1 },
      'Printer': { baseCredits: 72, baseValue: 312, multiplier: 1.0 },
      'Router': { baseCredits: 36, baseValue: 100, multiplier: 0.8 },
      'Keyboard': { baseCredits: 24, baseValue: 62, multiplier: 0.6 },
      'Mouse': { baseCredits: 18, baseValue: 37, multiplier: 0.5 },
      'Speaker': { baseCredits: 30, baseValue: 75, multiplier: 0.7 },
      'Camera': { baseCredits: 48, baseValue: 187, multiplier: 0.9 },
      'Other': { baseCredits: 42, baseValue: 125, multiplier: 1.0 }
    };

    const conditionMultipliers = {
      'Excellent': 1.0,
      'Good': 0.8,
      'Fair': 0.6,
      'Poor': 0.4
    };

    const ageDepreciation = Math.max(0.3, 1 - (parseInt(formData.age) * 0.1));

    const deviceInfo = deviceTypeValues[formData.deviceType] || deviceTypeValues['Other'];
    const conditionMultiplier = conditionMultipliers[formData.condition] || 0.6;

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

    return {
      ecoCredits: estimatedCredits,
      carbonCredits: parseFloat(carbonCredits),
      estimatedValue: estimatedValue
    };
  };

  const getEstimates = () => {
    if (!formData || !formData.deviceType || !formData.condition || !formData.age) {
      return null;
    }
    
    try {
      return calculateEstimates();
    } catch (error) {
      console.error('Error calculating estimates:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      if (imageFile) {
        formDataToSend.append('deviceImage', imageFile);
      }

      const response = await fetch('/api/deposit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        setFormData({
          userId: 'demo-user',
          deviceType: '',
          brand: '',
          model: '',
          condition: '',
          age: ''
        });
        setImageFile(null);
        setImagePreview('');
      } else {
        setError(data.message || 'Failed to deposit device');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.deviceType && formData.brand && formData.model && 
                     formData.condition && formData.age;

  return (
    <div className="deposit">
      <div className="container">
        <div className="deposit-header">
          <h1>{t('deposit.title')}</h1>
          <p>Register your electronic device for recycling and earn eco-credits</p>
        </div>

        <div className="deposit-content">
          <div className="deposit-form-section">
            <form onSubmit={handleSubmit} className="deposit-form">
              <h2>{t('deposit.deviceInfo')}</h2>
              
              <div className="form-group">
                <label htmlFor="deviceType">{t('deposit.deviceType')} *</label>
                <select
                  id="deviceType"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select device type</option>
                  {deviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="brand">{t('deposit.brand')} *</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g., Apple, Samsung, Dell"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="model">{t('deposit.model')} *</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., iPhone 13, XPS 15"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="condition">{t('deposit.condition')} *</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="age">{t('deposit.age')} *</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Device age in years"
                    min="0"
                    max="20"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="deviceImage">{t('deposit.uploadImage')}</label>
                <div className="image-upload">
                  <input
                    type="file"
                    id="deviceImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <div className="image-upload-area">
                    {imagePreview ? (
                      <div className="image-preview-container">
                        <img src={imagePreview} alt="Device preview" className="image-preview" />
                        <button type="button" className="remove-image" onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-buttons">
                          <button type="button" className="upload-btn" onClick={() => document.getElementById('deviceImage').click()}>
                            <div className="upload-icon">📁</div>
                            <span>Choose File</span>
                          </button>
                          <button type="button" className="camera-btn" onClick={handleCameraCapture}>
                            <div className="upload-icon">📷</div>
                            <span>Take Photo</span>
                          </button>
                        </div>
                        <p>Upload a photo of your device</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            {(() => {
              const estimates = getEstimates();
              return estimates && (
                <div className="estimates-section">
                  <h3>Estimated Rewards</h3>
                  <div className="estimates-grid">
                    <div className="estimate-item">
                      <div className="estimate-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                          <path d="M2 17L12 22L22 17"></path>
                          <path d="M2 12L12 17L22 12"></path>
                        </svg>
                      </div>
                      <div className="estimate-content">
                        <div className="estimate-value">{estimates.ecoCredits}</div>
                        <div className="estimate-label">Eco Credits</div>
                      </div>
                    </div>
                    
                    <div className="estimate-item">
                      <div className="estimate-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6V12L16 14"></path>
                        </svg>
                      </div>
                      <div className="estimate-content">
                        <div className="estimate-value">{estimates.carbonCredits}</div>
                        <div className="estimate-label">Carbon Credits</div>
                      </div>
                    </div>
                    
                    <div className="estimate-item">
                      <div className="estimate-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div className="estimate-content">
                        <div className="estimate-value">₹{estimates.estimatedValue}</div>
                        <div className="estimate-label">Estimated Value</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={!isFormValid || loading}
            >
              {loading ? 'Processing...' : t('deposit.submit')}
            </button>
          </form>
          </div>

          {result && (
            <div className="deposit-results">
              <h2>{t('deposit.results.title')}</h2>
              <div className="result-card">
                <div className="result-header">
                  <div className="success-icon">✅</div>
                  <h3>Device Successfully Registered!</h3>
                </div>
                
                <div className="result-details">
                  <div className="result-item">
                    <span className="label">{t('deposit.results.deviceType')}:</span>
                    <span className="value">{result?.device?.deviceType || 'N/A'}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="label">{t('deposit.results.co2Avoided')}:</span>
                    <span className="value highlight">{result?.transaction?.co2Footprint || 0} kg CO₂</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="label">{t('deposit.results.carbonCredits')}:</span>
                    <span className="value">{result?.transaction?.carbonCreditsEarned || 0}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="label">{t('deposit.results.ecoCredits')}:</span>
                    <span className="value highlight">{result?.transaction?.ecoCreditsEarned || 0}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="label">{t('deposit.results.marketValue')}:</span>
                    <span className="value">${result?.transaction?.marketValue || 0}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="label">{t('deposit.results.transactionId')}:</span>
                    <span className="value small">{result?.transaction?.transactionHash || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="delivery-scheduling">
              <h2>Schedule Device Pickup</h2>
              <p>Arrange for convenient pickup of your registered device</p>
              
              {!showDeliveryForm ? (
                <div className="schedule-prompt">
                  <div className="prompt-content">
                    <div className="prompt-icon">📦</div>
                    <div className="prompt-text">
                      <h3>Ready to schedule pickup?</h3>
                      <p>Choose a convenient date and time for our team to collect your device</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="schedule-btn"
                    onClick={() => setShowDeliveryForm(true)}
                  >
                    Schedule Pickup
                  </button>
                </div>
              ) : (
                <div className="delivery-form">
                  <h3>Pickup Details</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Handle delivery scheduling
                    alert('Delivery scheduled successfully!');
                    setShowDeliveryForm(false);
                  }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number *</label>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={deliveryData.mobileNumber}
                          onChange={handleDeliveryInputChange}
                          placeholder="Enter your 10-digit mobile number"
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="pincode">Pincode *</label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={deliveryData.pincode}
                          onChange={handleDeliveryInputChange}
                          placeholder="Enter your area pincode"
                          pattern="[0-9]{6}"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Complete Address *</label>
                      <textarea
                        id="location"
                        name="location"
                        value={deliveryData.location}
                        onChange={handleDeliveryInputChange}
                        placeholder="Enter your complete address for pickup"
                        rows="3"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="deliveryDate">Preferred Pickup Date *</label>
                      <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={deliveryData.deliveryDate}
                        onChange={handleDeliveryInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="delivery-actions">
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => setShowDeliveryForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="confirm-btn">
                        Confirm Pickup
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
