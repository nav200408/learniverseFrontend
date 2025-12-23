import axiosClient from "../AxiosSecurity"
export function createCourse(formData){
    return axiosClient.post("http://localhost:8084/course-route/course-admin/create-course",
        formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}

export function showAllCourse(page){
    return axiosClient.get(`http://localhost:8084/course-route/course-admin/show-all?page=${page}&size=5`);
}

