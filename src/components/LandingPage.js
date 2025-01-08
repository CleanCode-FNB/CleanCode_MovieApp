import React from 'react';
import { Camera, Shield, Zap, ArrowRight } from 'lucide-react';
import './Landingpage.css'
import { Link } from 'react-router-dom';

 
const LandingPage = () => {
    // const navigate = useNavigate();
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="hero-content">
          <h1 className="hero-title">
            Discover the Next Generation of Movie Experience
          </h1>
          <p className="hero-subtitle">
            Immerse yourself in a world of endless entertainment. Stream your favorite movies and TV shows anytime, anywhere, with crystal-clear quality and unmatched convenience.
          </p>
          <div className="button-group">
            <Link to="/LoginPage" className="button primary-button">
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
 
      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <Camera className="feature-icon" />
            <h3 className="feature-title">4K Ultra HD</h3>
            <p className="feature-description">
              Experience movies in stunning 4K resolution with HDR support for the ultimate viewing experience.
            </p>
          </div>
 
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3 className="feature-title">Secure Streaming</h3>
            <p className="feature-description">
              Your entertainment is protected with state-of-the-art encryption and security measures.
            </p>
          </div>
 
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              No buffering, no waiting. Enjoy instant playback with our optimized streaming technology.
            </p>
          </div>
        </div>
      </section>
 
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-text">
            Join millions of viewers who have already discovered the future of entertainment.
          </p>
          <div className="button-group">
            <Link to="/LoginPage" className="button primary-button">
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default LandingPage;