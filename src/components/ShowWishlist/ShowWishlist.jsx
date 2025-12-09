import React, { useEffect, useState } from 'react';
import './ShowWishlist.css';
import { showWishlist } from '../../services/WishlistService/WishlistService';
import { useNavigate } from 'react-router-dom';
const WishList = () => {
    let navigate = useNavigate();
  let [courses,setCourses] = useState([]);

  useEffect(()=>{
    initCourses();
  },[])

  async function initCourses() {
    try{
    let res = await showWishlist();
    if(res.status ===200){
    setCourses(res.data);
    }
}catch(err){
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
  }

  return (
   <div className="Show-wishlist-container">
  <header className="Show-wishlist-header">
    <h1>WishList</h1>
  </header>

  <div className="Show-wishlist-grid">
    {courses?.map(course => (
      <div key={course.courseId} className="Show-wishlist-card">
        <div className="Show-wishlist-card-header">
          <h2>{course.courseName}</h2>
          <span className="Show-wishlist-card-price">{course.price}$</span>
        </div>
        <div className="Show-wishlist-card-description">
          <p>{course.courseDetail}</p>
        </div>
        <div className="Show-wishlist-card-footer">
          <button className="Show-wishlist-btn" onClick={() => { navigate(`/detail?courseId=${course.courseId}`) }}>
            See Course
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default WishList;