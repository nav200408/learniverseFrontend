import React, { useEffect, useState } from 'react';
import './VideoComponent.css';
import { useLocation, useNavigate } from 'react-router-dom';

function VideoComponent() {
  const [video, setVideo] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let filename = query.get("filename")

  useEffect(() => {
    videoReceiver(filename);
  }, [filename]);

  async function videoReceiver(fileName) {
    setVideo(`http://localhost:8084/stream-route/video/stream?filename=${fileName}`);
  }

  return (
    <div className="video-container">
      {video && (
        <video 
          className="video-player" 
          src={video} 
          controls 
        />
      )}
    </div>
  );
}

export default VideoComponent;
