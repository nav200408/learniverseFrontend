import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  let token = localStorage.getItem("access token");
  if(token){
    return token
  }
  return null;
};

export const getUserName =()=>{
    const token = getToken();
    if(token){
    return jwtDecode(token).sub
    }
    return null;
}
