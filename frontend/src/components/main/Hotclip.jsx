import React, { useState, useEffect } from "react";
import {
  HotClipContainer,
  VideoWrapper,
  VideoContainer,
} from "../../styles/main-styles/HotclipStyle";
import axios from "axios";
import { Title } from "../../styles/main-styles/MainStyle";
import { getSavedAt, getYoutubeList, postYoutube } from "../../api/youtube";

export default function Hotclip() {
  const [videos, setVideos] = useState([]);

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
            ({ data }) => {
              setVideos(data);
            },
            (error) => {
              console.log(error);
            },
          );
        } else {
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=K리그1&type=video&key=AIzaSyAiIjoGsj76V6QBcMomRQcuB9TC6pkznyE`,
            )
            .then(({ data }) => {
              const newVideos = data.items.map((item, index) => {
                return {
                  rank: index + 1,
                  youtubeId: item.id.videoId,
                };
              });
              postYoutube(
                { items: newVideos },
                () => {
                  setVideos(newVideos);
                },
                (error) => {
                  console.log(error);
                },
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <div>
      <HotClipContainer>
        <Title>💖 HOT</Title>
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
