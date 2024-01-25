import React from "react";
import {
  NoticeBar,
  NoticeBar1,
  AnimatedTitle,
  Track,
  Content,
} from "../../styles/main-styles/noticeStyle";

export default function Notice() {
  return (
    <div>
      <NoticeBar>
        <NoticeBar1>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "0.0625rem" }}>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Loudspeaker.png"
                alt="Loudspeaker"
                width="15"
                height="15"
              />
            </div>
            <div style={{ marginLeft: "0.4rem" }}>
              <b>공지</b>
            </div>
          </div>
        </NoticeBar1>
        <AnimatedTitle>
          <Track>
            <Content>
              ???&nbsp;여러분 ~~~~~~~ 로그인 하면 5골 드려용 푸하핫 ✨
              &nbsp;30분 뒤에 FC서울 vs 수원FC 시작합니댕 🏆 모두들 많 관 부 ^0^
              &nbsp;또 뭐가 알림인가요? ㅋ 울산이랑 광주 경기 끝났음요
            </Content>
          </Track>
        </AnimatedTitle>
      </NoticeBar>
    </div>
  );
}
