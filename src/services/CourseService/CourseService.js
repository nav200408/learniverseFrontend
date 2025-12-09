import axios from "axios";
export function showAllCourse(page,size){
    return axios.get(`http://localhost:8084/course-route/course/show-all?page=${page}&size=${size}`);
}

export function showCourseByCategory(category){
return axios.get(`http://localhost:8084/category-route/category/show-course-by-category?categoryName=${category}`);
}

export function getCourseById(courseId){
    return axios.get(`http://localhost:8084/course-route/course/show-detail?courseId=${courseId}`);
}
