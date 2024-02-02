import React, { useState, useEffect } from "react";
import {
  Progress,
  Done,
  Text,
  Kfont,
} from "../../styles/SurveyStyles/LoadingBarStyle";

function LoadingBar() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDone((prevDone) => {
        if (prevDone >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevDone + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const style = {
    opacity: 1,
    width: `${done}%`,
  };

  return (
    <Progress>
      <Text>
        나와 비슷한
        <br />
        <Kfont>K-League</Kfont>
        구단을 분석 중입니다
        <br />
        <br />
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Blue%20Heart.png"
          alt="Blue Heart"
          width="100"
          height="100"
        />
      </Text>
      <Done style={style}>{done}%</Done>
    </Progress>
  );
}

export default LoadingBar;
