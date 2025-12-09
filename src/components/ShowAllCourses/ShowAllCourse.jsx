import React, { useEffect, useState } from 'react';
import './ShowAllCourse.css';
import { showAllCourse } from '../../services/CourseService/CourseService';
import { showCourseByCategory } from '../../services/CourseService/CourseService';
import { useNavigate } from 'react-router-dom';
const ShowAllCourse = () => {
  let navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const categories = [
    'All',
    'Mới học lập trình',
    'Cơ sở dữ liệu',
    'Lập trình Web',
    'Java Backend',
    'Java Fullstack',
    'Data Science',
    'Kiến thức nền tảng'
  ];

  const fetchCourses = async (currentPage, size, activeCategory) => {
    try {
      setLoading(true);
      let response;

      if (activeCategory === 'All') {
        response = await showAllCourse(currentPage, size);
      } else {
        response = await showCourseByCategory(activeCategory);
      }

      console.log('API Response:', response.status);
      
      if (response.data && activeCategory === 'All') {
        setCourses(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.pageable.pageNumber);
      } 
      else if (response.data && activeCategory != 'All') {
        setCourses(response.data);
        setTotalPages(0);
        setCurrentPage(0);
      } else {
        setCourses([]);
        setTotalPages(0);
        setCurrentPage(0);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, pageSize, activeCategory);
  }, [currentPage, pageSize, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e) => {
   
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="courses-page">
      <h1>CHỌN LỘ TRÌNH CỦA BẠN & CÙNG HỌC NHÉ!</h1>
      
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {courses.length === 0 ? (
        <div className="no-courses">No courses found for this category.</div>
      ) : (
        <>
          <div className="course-list">
            {courses.map(course => (
              <div key={course.courseId} className="course-card">
                <div className="course-header">
                  {course.courseImage && (
                    <img 
                      src={`http://localhost:8084/stream-route/image/stream?filename=${course.courseImage}`} 
                      alt={course.courseImage}
                      className="course-image"
                    />
                  )}
                  <h2>{course.courseName}</h2>
                </div>
                
                <p className="course-description">
                  {course.courseDetail || 'No description available'}
                </p>
                
                <div className="course-details">
                  <div className="price-section">
                    <span className="price-label">Price:</span>
                    <span className="price-value">
                      {course.price ? `$${course.price.toLocaleString()}` : 'Free'}
                    </span>
                  </div>
                  
                </div>
                
                <div className="course-footer">
                  <button className="enroll-button" onClick={()=>{return navigate(`/detail?courseId=${course.courseId}`)}} >Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>

          {totalPages !== 0 && (
  <div className="pagination">
    <button 
      onClick={() => handlePageChange(currentPage - 1)} 
      disabled={currentPage === 0}
    >
      Previous
    </button>
    
    <span className="page-info">
      Page {currentPage + 1} of {totalPages}
    </span>
    
    <button 
      onClick={() => handlePageChange(currentPage + 1)} 
      disabled={currentPage >= totalPages - 1}
    >
      Next
    </button>
  </div>
)}
        </>
      )}
    </div>
  );
};

export default ShowAllCourse;