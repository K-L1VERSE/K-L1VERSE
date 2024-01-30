import React from "react";
import Board from "../../components/main/Board";
import { Category, Title, AllBtn } from "../../styles/main-styles/MainStyle";
import TodayMatch from "../../components/main/TodayMatch";
import Notice from "../../components/main/Notice";
import Hotclip from "../../components/main/Hotclip";
import Nostradamus from "../../components/main/Nostradamus";
import Survey from "../../components/main/Survey";

function MainPage() {
  (function () {
    var w = window;
    if (w.ChannelIO) {
      return w.console.error("ChannelIO script included twice.");
    }
    var ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      var x = document.getElementsByTagName("script")[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    }
    if (document.readyState === "complete") {
      l();
    } else {
      w.addEventListener("DOMContentLoaded", l);
      w.addEventListener("load", l);
    }
  })();

  ChannelIO("boot", {
    pluginKey: "e6c79081-3a8d-4b7f-8f9d-c90be614e40a",
  });

  return (
    <div>
      {/* 공지사항 컨테이너*/}
      <Notice />
      {/* 커뮤니티 컨테이너 */}
      <Category>
        <Title>💬 커뮤니티</Title>
        <AllBtn>전체보기</AllBtn>
      </Category>
      <Board />
      {/* 오늘의 경기 컨테이너 */}
      <Category>
        <Title>🏁 오늘의 경기</Title>
        <AllBtn>전체보기</AllBtn>
      </Category>
      <TodayMatch />
      {/* 핫클립 컨테이너 */}
      <Hotclip />
      {/* 노스트라다무스 컨테이너 */}
      <Category>
        <Title>🎯 노스트라다무스 랭킹</Title>
      </Category>
      <Nostradamus />
      {/* 성향설문 버튼 */}
      <Survey />
    </div>
  );
}

export default MainPage;
