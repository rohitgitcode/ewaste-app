import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import '../styles/About.css';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>{t('about.title')}</h1>
          <p>Learn about our mission to create a sustainable future through e-waste recycling</p>
        </div>

        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>{t('about.mission')}</h2>
              <p>
                Our mission is to revolutionize e-waste management by creating a transparent, 
                rewarding, and environmentally responsible recycling ecosystem. We believe that 
                every electronic device deserves a second chance, and every recycling action 
                should be recognized and rewarded.
              </p>
              <p>
                Through our innovative platform, we connect individuals with certified recycling 
                facilities, track the environmental impact of every device, and provide tangible 
                incentives in the form of eco-credits and carbon credits. Together, we're building 
                a circular economy where electronic waste becomes a valuable resource rather than 
                an environmental burden.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <div className="stat-number">50M+</div>
                  <div className="stat-label">Tons of e-waste generated annually</div>
                </div>
                <div className="stat">
                  <div className="stat-number">20%</div>
                  <div className="stat-label">Currently recycled worldwide</div>
                </div>
                <div className="stat">
                  <div className="stat-number">80%</div>
                  <div className="stat-label">Goal: Increase recycling rate</div>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop&crop=center" alt="Sustainable Future" />
                <span>Sustainable Future</span>
              </div>
            </div>
          </div>
        </section>

        <section className="blockchain-section">
          <h2>{t('about.blockchain')}</h2>
          <div className="blockchain-content">
            <div className="blockchain-features">
              <div className="feature">
                <div className="feature-icon">🔗</div>
                <h3>Transparent Tracking</h3>
                <p>
                  Every transaction is recorded on our blockchain ledger, ensuring complete 
                  transparency and traceability of recycled devices and earned credits.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">🛡️</div>
                <h3>Secure & Immutable</h3>
                <p>
                  Blockchain technology ensures that all records are secure, tamper-proof, 
                  and permanently stored for verification and auditing purposes.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Instant Verification</h3>
                <p>
                  Real-time verification of recycling transactions and credit issuance 
                  through smart contracts and automated validation systems.
                </p>
              </div>
            </div>
            <div className="blockchain-visual">
              <div className="blockchain-demo">
                <div className="block">
                  <div className="block-hash">0x7f9a...</div>
                  <div className="block-data">Device: iPhone 12</div>
                </div>
                <div className="arrow">↓</div>
                <div className="block">
                  <div className="block-hash">0x3b2c...</div>
                  <div className="block-data">Credits: 50 Eco, 0.05 Carbon</div>
                </div>
                <div className="arrow">↓</div>
                <div className="block">
                  <div className="block-hash">0x8d4e...</div>
                  <div className="block-data">Status: Recycled</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="carbon-credits-section">
          <h2>{t('about.howItWorks')}</h2>
          <div className="credits-explanation">
            <div className="credits-types">
              <div className="credit-type eco">
                <div className="credit-header">
                  <div className="credit-icon">🌱</div>
                  <h3>Eco Credits</h3>
                </div>
                <div className="credit-details">
                  <p>
                    Eco Credits are earned based on the environmental impact of your recycling actions. 
                    For every 100 kg of CO₂ equivalent avoided through recycling, you earn 10 Eco Credits.
                  </p>
                  <div className="credit-example">
                    <strong>Example:</strong> Recycling a laptop (300 kg CO₂) = 30 Eco Credits
                  </div>
                  <div className="credit-uses">
                    <h4>Use Eco Credits for:</h4>
                    <ul>
                      <li>Eco-friendly products</li>
                      <li>Partner discounts</li>
                      <li>Digital badges and achievements</li>
                      <li>Community rewards</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="credit-type carbon">
                <div className="credit-header">
                  <div className="credit-icon">⚡</div>
                  <h3>Carbon Credits</h3>
                </div>
                <div className="credit-details">
                  <p>
                    Carbon Credits represent the actual CO₂ emissions avoided through recycling. 
                    One Carbon Credit equals 1 ton of CO₂ equivalent prevented from entering the atmosphere.
                  </p>
                  <div className="credit-example">
                    <strong>Example:</strong> Recycling 20 phones (1,000 kg CO₂) = 1 Carbon Credit
                  </div>
                  <div className="credit-uses">
                    <h4>Use Carbon Credits for:</h4>
                    <ul>
                      <li>Carbon offset donations</li>
                      <li>Environmental projects</li>
                      <li>Green investments</li>
                      <li>Corporate sustainability programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section">
          <h2>How Our Platform Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Register Device</h3>
                <p>Submit details about your electronic device including type, brand, model, and condition.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get Valuation</h3>
                <p>Our system calculates the environmental impact and determines the credits you'll earn.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Drop Off Device</h3>
                <p>Take your device to a certified recycling facility or schedule a pickup.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Earn Credits</h3>
                <p>Receive instant eco-credits and carbon credits credited to your account.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Track Impact</h3>
                <p>Monitor your environmental contribution and redeem rewards in our marketplace.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>{t('about.contact')}</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>support@ewasterecycling.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Headquarters</h3>
                  <p>123 Green Street, Eco City, EC 12345</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div className="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9AM - 6PM EST</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a Message</h3>
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
