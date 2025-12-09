import axios from 'axios';

export function loginService(username, password){
return axios.post("http://localhost:8084/user-route/api/auth/login",{
    "email":username,
    "password":password
},{
  headers: {
    'Content-Type': 'application/json'
  }
})
}

export function registerService(formData) {
  return axios.post('http://localhost:8084/user-route/api/auth/register', {
    fullName: formData.fullName,
    address: formData.address,
    age: formData.age,
    username: formData.username,
    password: formData.password,
    email: formData.email
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export async function refereshService(refreshToken){
 
let accessToken = await axios.post(`http://localhost:8084/user-route/api/auth/refresh?refreshToken=${refreshToken}`,null,{
  headers:{
    'Content-Type': 'application/json'
  }
})
console.log(accessToken);
return accessToken.data
}