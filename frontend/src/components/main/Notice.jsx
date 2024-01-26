import React, { useEffect, useRef } from "react";
import {
  NoticeBar,
  NoticeBar1,
  AnimatedTitle,
  Track,
  Content,
} from "../../styles/main-styles/noticeStyle";

export default function Notice() {
  const contentText =
    "출석하면 5골이 적립됩니다 ✨ 글 쓰면 5골이 적립됩니다 ✨ 출석하면 5골이 적립됩니다 ✨ 글 쓰면 5골이 적립됩니다 ✨ 출석하면 5골이 적립됩니다 ✨ 글 쓰면 5골이 적립됩니다 ✨ 출석하면 5골이 적립됩니다 ✨ 글 쓰면 5골이 적립됩니다 ✨";
  // 여러분 ~~~~~~~ 로그인 하면 5골 드려용 푸하핫 ✨
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
          <div style={{ display: "inline-block" }}>
            <Track>
              <div style={{ display: "inline-block" }}>
                <Content>
                  {contentText}
                  {contentText}
                  {contentText}
                  {contentText}
                  {contentText}
                </Content>
              </div>
            </Track>
          </div>
        </AnimatedTitle>
      </NoticeBar>
    </div>
  );
}
