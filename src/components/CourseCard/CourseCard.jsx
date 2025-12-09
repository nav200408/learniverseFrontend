import React, { useEffect, useState } from 'react';
import './CourseCard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkEnrollment } from '../../services/EnrollmentService/EnrollmentService';
import { addToWishlist } from '../../services/WishlistService/WishlistService';
import { getCourseById } from '../../services/CourseService/CourseService';
import { doPayment } from '../../services/PaymentService/PaymentService';
import { getUserName } from '../../../utils/auth';

const CourseInfoCard = () => {
let [isEnrolled, setIsEnrolled] = useState(false);
let [course,setCourse] = useState()
let navigate = useNavigate();
let location = useLocation();
let query = new URLSearchParams(location.search);
let courseId = query.get("courseId");

async function checkEnroll(courseId){
let res = await checkEnrollment(courseId);
console.log(res.data);
setIsEnrolled(res.data)
}

async function getCourse(courseId){
    let res = await getCourseById(courseId);
    if(res.status == 200){
        setCourse(res.data);
    }
    else setCourse(null);
}

useEffect(()=>{
    checkEnroll(courseId);
    getCourse(courseId)
},[]);
  return (
    <div className="course-card-container">
      {/* Header Image Section */}
      <div className="course-card-image">
        <div className="course-card-image-text">
          {course?.courseName}
          <div style={{ fontSize: '40px', marginTop: '10px' }}>🍃</div>
        </div>
      </div>

      {/* Body Content */}
      <div className="course-card-content">
        
        {/* Duration Notice */}
        <div className="course-card-duration">
          Course available for <span>180 days</span>
        </div>

        {isEnrolled && <div className="course-card-purchase-row">
          <button className="course-card-get-btn" onClick={()=>{navigate(`/learn-page?courseId=${course?.courseId}`)}}>Learn Course</button>
          {/* <div className="course-card-price-tag">{course?.price} ₫</div> */}
        </div>}
        {!isEnrolled && <div className="course-card-purchase-row">
          <button className="course-card-get-btn" onClick={async()=>{
            try{
            let res = await doPayment(`${getUserName(localStorage.getItem("access token"))}:${course?.courseId}:hoctap2201040199@gmail.com`,course?.price);
            if (res.status === 200 || res.status === 201) {
            window.open(res.data.message, "_blank");
            }

            }catch(err){
        console.error("Error adding to wishlist:", err);
        const status = err.response?.status || err.status;
         if (status === 403 || status === 401) {
            alert("You are not authorized or authenticated");
            localStorage.removeItem("access token");
            localStorage.removeItem("refresh token");
            navigate("/login");
        }
        else{
            alert(err)
        }
            }
          }}>GET COURSE</button>
          <div className="course-card-price-tag">{course?.price} ₫</div>
        </div>}

        {/* Action Icons */}
       <div className="course-card-action-item" onClick={async () => {
    try {
        if (!course?.courseId) {
            console.warn("Course ID not loaded yet");
            return;
        }

        let res = await addToWishlist(course?.courseId);
        
        // Check for 200 or 201 (Created)
        if (res.status === 200 || res.status === 201) {
            alert("add to wishlist successfully");
        }
    } catch (err) {
        console.error("Error adding to wishlist:", err);

        // FIX 1: Access status code correctly (usually err.response.status in Axios)
        // usage of optional chaining (?.) prevents crashes if response is undefined
        const status = err.response?.status || err.status;

        if (status === 400) {
            alert("This course has already been added before");
        } 
        
        // FIX 2: Removed 'console.log(res.status)' because 'res' does not exist in the catch block
        
        else if (status === 403 || status === 401) {
            alert("You are not authorized or authenticated");
            localStorage.removeItem("access token");
            localStorage.removeItem("refresh token");
            navigate("/login");
        }
    }
}}>
    <span>♡</span> Add to wishlist
</div>

        {/* Contact Info */}
        <div className="course-card-contact-section">
          <div className="course-card-contact-label">Liên hệ: 1234568910</div>
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