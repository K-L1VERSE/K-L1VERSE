import React, { useState, useEffect } from "react";
import {
  HotClipContainer,
  Img,
  VideoWrapper,
  VideoContainer,
} from "../../styles/main-styles/hotclipStyle";
import heart from "../../assets/heart_on_fire.png";
import axios from "axios";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

export default function Hotclip() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=K리그1&type=video&key=AIzaSyBUtZRnB1VYQ4_vFi7a3rtucf0IpryvDrw`,
      );

      setVideos(response.data.items);
    };

    fetchVideos();
  }, []);
  return (
    <div>
      <HotClipContainer>
        <div style={{ marginBottom: "0.7rem" }}>
          <Img src={heart} />
          <b>HOT</b>
        </div>
        <VideoWrapper>
          {videos.map((video) => (
            <VideoContainer>
              <iframe
                key={video.id.videoId}
                id="ytplayer"
                type="text/html"
                width="265"
                src={`https://www.youtube.com/embed/${video.id.videoId}?controls=1&fs=0&modestbranding=1&color=white`}
                frameborder="0"
              ></iframe>
            </VideoContainer>
          ))}
        </VideoWrapper>
      </HotClipContainer>
    </div>
  );
}
