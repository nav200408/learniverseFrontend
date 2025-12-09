import axiosClient from "../AxiosSecurity";

export function checkEnrollment(courseId){
    return axiosClient.get(`http://localhost:8084/enrollment-route/enrollment/is-enrolled?courseId=1`);
}