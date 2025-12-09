import axiosClient from "../AxiosSecurity";

export function addToWishlist(courseId){
return axiosClient.get(`http://localhost:8084/wishlist-route/wishlist/add-to-wish-list?courseId=${courseId}`);
}
export function showWishlist(){
    return axiosClient.get("http://localhost:8084/wishlist-route/wishlist/show-wish-course");
}