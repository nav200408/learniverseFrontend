import axios from "axios";
import { refereshService } from "../AuthService/authService";

export async function streamVideo(videoName){
let res = await axios.get(`http://localhost:8084/stream-route/video/stream?filename=${videoName}`);
return res.data;
}
