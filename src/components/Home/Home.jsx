import React from 'react';
import './Home.css'; // Make sure your CSS file is imported here
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate();
  return (
    <main className="home-page-main-container">
      <section className="home-page-hero-section">
        <div className="home-page-hero-content">
          <h1 className="home-page-main-title">Welcome to Learniverse</h1>
          <p className="home-page-tagline">
            Your gateway to limitless learning. Master new skills with courses
            taught by industry experts.
          </p>
        </div>
      </section>

      <section className="home-page-info-section">
        <h2 className="home-page-section-heading">Why Choose Us</h2>

        <div className="home-page-info-grid">
          <div className="home-page-info-card">
            <h3 className="home-page-card-title">Diverse Catalog</h3>
            <p className="home-page-card-desc">
              Explore thousands of courses ranging from technology and business
              to creative arts.
            </p>
          </div>

          <div className="home-page-info-card">
            <h3 className="home-page-card-title">Flexible Learning</h3>
            <p className="home-page-card-desc">
              Learn at your own pace, on your own schedule, from any device,
              anywhere in the world.
            </p>
          </div>

          <div className="home-page-info-card">
            <h3 className="home-page-card-title">Expert Instructors</h3>
            <p className="home-page-card-desc">
              Gain insights from top-tier professionals and leading academics in
              their fields.
            </p>
          </div>
        </div>
      </section>

      <div className="home-page-cta-container">
        <button className="home-page-discover-btn" onClick={()=>{return navigate("/courses") }}>Discover Courses</button>
      </div>
    </main>
  );
};

export default Home;