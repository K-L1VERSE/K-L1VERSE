import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  HotClipContainer,
  VideoWrapper,
  VideoContainer,
  ThumbnailImg,
  PlayImg,
} from "../../styles/main-styles/HotclipStyle";
import { Title } from "../../styles/main-styles/MainStyle";
import { getSavedAt, getYoutubeList, postYoutube } from "../../api/youtube";
import playIcon from "../../assets/play.png";

export default function Hotclip() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    getSavedAt(
      ({ data }) => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;

        if (dateStr === data.savedAt.split("T")[0]) {
          getYoutubeList(
            (res) => {
              if (res && res.data) {
                setVideos(res.data);
              }
            },
            () => {},
          );
        } else {
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=K리그1&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
            )
            .then((res) => {
              if (res && res.data) {
                const newVideos = data.items.map((item, index) => {
                  return {
                    rank: index + 1,
                    youtubeId: item.id.videoId,
                    thumbnail: item.snippet.thumbnails.medium.url,
                  };
                });
                postYoutube(
                  { items: newVideos },
                  () => {
                    setVideos(newVideos);
                  },
                  () => {},
                );
              }
            })
            .catch(() => {});
        }
      },
      () => {},
    );
  }, []);

  const handleClickThumbnail = (videoId) => {
    setActiveVideo(videoId);
  };

  return (
    <div>
      <HotClipContainer>
        <Title>💖 HOT</Title>
        <VideoWrapper>
          {videos.map((video) => (
            <VideoContainer key={video.youtubeId}>
              {activeVideo === video.youtubeId ? (
                <iframe
                  title={video.youtubeId}
                  id="ytplayer"
                  type="text/html"
                  width="267"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&controls=1&fs=0&modestbranding=1&color=white`}
                  frameBorder="0"
                />
              ) : (
                <div onClick={() => handleClickThumbnail(video.youtubeId)}>
                  <ThumbnailImg src={video.thumbnail} alt="thumbnail" />
                  <PlayImg src={playIcon} />
                </div>
              )}
            </VideoContainer>
          ))}
        </VideoWrapper>
      </HotClipContainer>
    </div>
  );
}
