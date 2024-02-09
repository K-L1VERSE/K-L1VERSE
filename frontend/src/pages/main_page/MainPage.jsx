/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../../global/UserState";
import Board from "../../components/main/Board";
import { Category, Title, AllBtn } from "../../styles/main-styles/MainStyle";
import TodayMatch from "../../components/main/TodayMatch";
import Notice from "../../components/main/Notice";
import Hotclip from "../../components/main/Hotclip";
import Nostradamus from "../../components/main/Nostradamus";
import Survey from "../../components/main/Survey";
import EditNicknameModal from "../../components/mypage/EditNicknameModal";

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
    pluginKey: process.env.REACT_APP_CHANNELIO_PLUGIN_KEY,
  });

  const navigate = useNavigate();

  function handleAllBtn() {
    navigate("/waggle");
  }

  const goMatchSchedule = () => {
    navigate("/matchSchedule");
  };

  const [userState] = useRecoilState(UserState);
  const { nickname } = userState;

  return (
    <div>
      <Notice />
      <Category>
        <Title>💬 커뮤니티</Title>
        <AllBtn onClick={handleAllBtn}>전체보기</AllBtn>
      </Category>
      <Board />
      <Category>
        <Title>🏁 오늘의 경기</Title>
        <AllBtn onClick={goMatchSchedule}>전체보기</AllBtn>
      </Category>
      <TodayMatch />
      <Hotclip />
      <Category>
        <Title>🎯 노스트라다무스 랭킹</Title>
      </Category>
      <Nostradamus />
      <Survey />

      {nickname === null && <EditNicknameModal type="signUp" />}
    </div>
  );
}

export default MainPage;
