import axios from "axios";
import { refereshService } from "../AuthService/authService";

export async function streamVideo(videoName){
let res = await axios.get(`http://localhost:8084/stream-route/video/stream?filename=${videoName}`);
return res.data;
}

export async function downloadDocument(filename) {
    try {
        const response = await axios.get(`http://localhost:8084/stream-route/document/download/${filename}`, {
            responseType: 'blob', // 1. IMPORTANT: Tell Axios to expect binary data
        });

        // 2. Create a Blob from the PDF Stream
        const file = new Blob(
            [response.data], 
            { type: response.headers['content-type'] } // Optional: Use the type sent by server
        );

        // 3. Create a temporary URL for the Blob
        const fileURL = window.URL.createObjectURL(file);

        // 4. Create a temporary anchor tag to trigger the download
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', filename); // The name the file will have on the user's computer
        document.body.appendChild(link);
        
        // 5. Trigger the click and clean up
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileURL); // Free up memory

    } catch (error) {
        console.error("Error downloading file:", error);
    }
}