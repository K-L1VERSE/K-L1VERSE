import React, { useState, useEffect } from "react";
import {
  HotClipContainer,
  Img,
  VideoWrapper,
  VideoContainer,
} from "../../styles/main-styles/hotclipStyle";
import heart from "../../assets/heart_on_fire.png";
import axios from "axios";
import ourAxios from "../../api/axios";

export default function Hotclip() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");

        const response = await ourAxios.get("/youtubes");
        const savedAt = response.data.savedAt.split("T")[0];
        const dateStr = `${yyyy}-${mm}-${dd}`;

        if (savedAt === dateStr) {
          const videoList = await ourAxios.get("/youtubes/list");
          setVideos(videoList.data);
        } else {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=K리그1&type=video&key=AIzaSyAiIjoGsj76V6QBcMomRQcuB9TC6pkznyE`,
          );

          const newVideos = response.data.items.map((item, index) => {
            return {
              rank: index + 1,
              youtubeId: item.id.videoId,
            };
          });

          await ourAxios.post("/youtubes", { items: newVideos });

          setVideos(newVideos);
        }
      } catch (error) {
        console.error(error);
      }
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
          {videos.map((video, index) => (
            <VideoContainer key={index}>
              <iframe
                id="ytplayer"
                type="text/html"
                width="265"
                src={`https://www.youtube.com/embed/${video.youtubeId}?controls=1&fs=0&modestbranding=1&color=white`}
                frameBorder="0"
              ></iframe>
            </VideoContainer>
          ))}
        </VideoWrapper>
      </HotClipContainer>
    </div>
  );
}
