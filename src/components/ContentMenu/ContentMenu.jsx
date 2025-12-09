import React, { useEffect, useState } from 'react';
import './contentMenu.css';
import { getCourseById } from '../../services/CourseService/CourseService';
import { useNavigate } from 'react-router-dom';
import { downloadDocument } from '../../services/StreamingService/StreamingService';

const ContentMenu = () => {
  let [course, setCourse] = useState(null);
  // ⭐ ADDED MISSING STATE FOR TOGGLING SECTIONS
  let [activeSection, setActiveSection] = useState('part1'); 

  let navigate = useNavigate();
  
  useEffect(()=>{
    getCourseDetail(1);
  },[])

  async function getCourseDetail(courseId) {
    try {
      let res = await getCourseById(courseId);
      setCourse(res.data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setCourse(null);
    }
  }
  
  console.log(course)
  
  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="content-menu-container">
  <h1 className="content-menu-main-title">{course?.courseName}</h1>
  
  <div className="content-menu-section">

    {/* Section Body */}
    {activeSection === 'part1' && (
      <div className="content-menu-units-list">
        {course?.units?.map((unit) => (
          <div key={unit.unitId} className="content-menu-unit">
            
            {/* Unit Header */}
            <div className="content-menu-unit-header">
              <h3 className="content-menu-unit-title">{unit.unitName}</h3>
              <p className="content-menu-unit-desc">{unit.description}</p>
            </div>

            {/* Videos List */}
            <div className="content-menu-items-group">
              {unit.video?.map((vid) => (
                <div key={vid.videoId} className="content-menu-item video-type" onClick={()=>{navigate(`/learn-page?courseId=${course.courseId}&filename=${vid.filename}`)}}>
                  <div className="content-menu-item-title">🎥 {vid.videoName}</div>
                  <div className="content-menu-item-subtitle">{vid.description}</div>
                </div>
              ))}
            </div>

            {/* Documents List */}
            <div className="content-menu-items-group">
              {unit?.documents?.map((document) => (
                <div key={document.documentId} className="content-menu-item doc-type" onClick={()=>{
                  downloadDocument(document?.filename);
                }}>
                  <div className="content-menu-item-title">📄 {document.documentName}</div>
                  <div className="content-menu-item-subtitle">{document.documentDescribtion}</div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    )}
  </div>

  <div className="content-menu-divider"></div>
</div>
  );
};

export default ContentMenu;