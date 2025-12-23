import { useEffect, useState } from "react";
import { showAllCourse } from "../../services/CourseService/CourseManagementService";
import "./ManageCourse.css"

export function ManageCourseComponent() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      const res = await showAllCourse(page);
      setData(res.data);
    };
    fetchCourseData();
  }, [page]);

  return (
    <div className="manage-course-container">
      <table className="manage-course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Is Delete</th>
            <th>Is Publish</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.content?.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td className="manage-course-desc">{course.courseDetail}</td>
              <td>${course.price}</td>
              <td>{course.category}</td>
              <td>
                <img
                  className="manage-course-image"
                  src={`http://localhost:8084/stream-route/image/stream?filename=${course.courseImage}`}
                  alt={course.courseName}
                />
              </td>
              <td>
                {course.delete ? "true":"false"}
              </td>
              <td>
                {course.publish? "true":"false"}
              </td>
              <td className="manage-course-actions">
                <button className="manage-course-btn detail">Detail</button>
                <button className="manage-course-btn publish">Publish</button>
                <button className="manage-course-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="manage-course-pagination">
        {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
          <button
            key={index}
            className={`manage-course-page-btn ${
              page === index ? "active" : ""
            }`}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}


