import React, { useEffect, useState } from 'react';
import './showMyCourse.css';
import { myCourse } from '../../services/EnrollmentService/EnrollmentService';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  let [courses,setCourses] = useState([]);
  let navigate = useNavigate();
  useEffect(()=>{
    initCourses();
  })

  async function initCourses() {
    let res = await myCourse();
    setCourses(res.data);
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Enrolled courses</h1>
      </header>
      
      <div className="horizontal-courses">
        {courses.map(course => (
          <div key={course.courseId} className="course-card">
            <div className="course-header">
              <h2>{course.courseName}</h2>
              <span className="course-category">{course.price}$</span>
            </div>
            <div className="course-description">
              <p>{course.courseDetail}</p>
            </div>
            <div className="course-footer">
              <button className="course-button" onClick={()=>{navigate(`/learn-page?courseId=${course.courseId}`)}}>
                START COURSE
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;