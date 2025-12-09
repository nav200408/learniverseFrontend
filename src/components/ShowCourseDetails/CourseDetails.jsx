import React, { useEffect, useState } from "react";
import "./courseDetail.css";
import { getCourseById } from "../../services/CourseService/CourseService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilePdf, faFileWord, faFileExcel, faFilePowerpoint,
  faFileText, faFile, faVideo
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";

export default function CourseDetails() {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();
  let query = new URLSearchParams(location.search)
  let courseId = query.get("courseId");

  useEffect(() => {
    fetchData(courseId);
  }, []);

  async function fetchData(courseId) {
    try {
      setLoading(true);
      let res = await getCourseById(courseId);
      setCourseData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getDocumentIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();

    switch (extension) {
      case "pdf": return <FontAwesomeIcon icon={faFilePdf} className="document-icon pdf" />;
      case "doc":
      case "docx": return <FontAwesomeIcon icon={faFileWord} className="document-icon word" />;
      case "xls":
      case "xlsx": return <FontAwesomeIcon icon={faFileExcel} className="document-icon excel" />;
      case "ppt":
      case "pptx": return <FontAwesomeIcon icon={faFilePowerpoint} className="document-icon powerpoint" />;
      case "txt": return <FontAwesomeIcon icon={faFileText} className="document-icon text" />;
      default: return <FontAwesomeIcon icon={faFile} className="document-icon default" />;
    }
  };

  if (loading) return <div className="course-page">Loading course details...</div>;
  if (error) return <div className="course-page">Error: {error}</div>;
  if (!courseData) return <div className="course-page">No course data available</div>;

  return (
    <div className="course-page">
      <h2>{courseData.courseName}</h2>
      <h4>{courseData.courseDetail}</h4>
      <h3>Curriculum</h3>

      {courseData.units?.map((section) => (
        <div key={section.unitName} className="section">
          <div className="section-header">
            <h4>{section.unitName}</h4>
          </div>

          {/* List all videos */}
          {section.video?.map((lesson) => (
            <div key={lesson.videoId} className="lesson">
              <FontAwesomeIcon icon={faVideo} className="video-icon" />
              <span className="lesson-number">{lesson.videoId}</span>
              <span className="lesson-title">{lesson.videoName}</span>
            </div>
          ))}

          {/* List all documents */}
          {section.documents?.map((lesson) => (
            <div key={lesson.documentId} className="lesson">
              {getDocumentIcon(lesson.documentName)}
              <span className="lesson-number">{lesson.documentId}</span>
              <span className="lesson-title">{lesson.documentName}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
