import React, { useState } from 'react';
import './CourseInfoCard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkEnrollment } from '../../services/EnrollmentService/EnrollmentService';

const CourseInfoCard = () => {
    let [isEnrolled, setIsEnrolled] = useState(false);
   let navigate = useNavigate();
let location = useLocation();
let query = new URLSearchParams(location.search);
   let courseId = query.get("courseId");

async function checkEnroll(courseId){
let res = await checkEnrollment(courseId);
}
  return (
    <div className="course-card-container">
      {/* Header Image Section */}
      <div className="course-card-image">
        <div className="course-card-image-text">
          SPRING <br /> & HIBERNATE
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🍃</div>
        </div>
      </div>

      {/* Body Content */}
      <div className="course-card-content">
        
        {/* Duration Notice */}
        <div className="course-card-duration">
          Course available for <span>180 days</span>
        </div>

        {/* Purchase Row */}
        <div className="course-card-purchase-row">
          <button className="course-card-get-btn">GET COURSE</button>
          <div className="course-card-price-tag">339,000 ₫</div>
        </div>

        {/* Action Icons */}
        <div className="course-card-actions">
          <div className="course-card-action-item">
            <span>♡</span> Add to wishlist
          </div>
          <div className="course-card-action-item">
            <span>➦</span> Share
          </div>
        </div>

        {/* Contact Info */}
        <div className="course-card-contact-section">
          <div className="course-card-contact-label">Liên hệ</div>
          <div className="course-card-divider"></div>
        </div>

        {/* Navigation Links */}
        <div className="course-card-links">
          <a href="#curriculum" className="course-card-nav-link">
            Curriculum
          </a>
          <a href="#reviews" className="course-card-nav-link">
            Reviews
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;