import React, { useRef } from "react";
import {
  TeamInfoWrap,
  Top,
  RightItem,
  TeamNameItem,
  SocialItem,
  TeamDesc,
  TeamImg,
  Members,
  Position,
  Member,
  Backno,
  MemberName,
  MembersWrap,
} from "../../styles/teamStyles/TeamStyle";
import Facebook from "../../assets/icon/facebook-icon.png";
import Home from "../../assets/icon/home-icon.png";
import Instagram from "../../assets/icon/instagram-icon.png";
import Youtube from "../../assets/icon/youtube-icon.png";

function TeamInfoItem({ teamInfo }) {
  const audioRef = useRef(null);

  const playAudio = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <TeamInfoWrap>
      <Top>
        <TeamImg>
          <img
            src={`${process.env.PUBLIC_URL}/badge/badge${teamInfo.teamId}.png`}
            alt="team"
          />
        </TeamImg>
        <RightItem>
          <TeamNameItem>{teamInfo.teamName}</TeamNameItem>
          <SocialItem>
            <a href={teamInfo.instagram} target="_blank">
              <img src={Instagram} alt="instagram" />
            </a>
            <a href={teamInfo.facebook} target="_blank">
              <img src={Facebook} alt="facebook" />
            </a>
            <a href={teamInfo.youtube} target="_blank">
              <img src={Youtube} alt="youtube" />
            </a>
            <a href={teamInfo.homepage} target="_blank">
              <img src={Home} alt="homepage" />
            </a>
            <div onClick={playAudio}>
              📣 응원가
              <audio
                ref={audioRef}
                src="https://k-l1verse.s3.ap-northeast-2.amazonaws.com/응원가/울산-우리의+울산.mp3"
              />
            </div>
          </SocialItem>
        </RightItem>
      </Top>
      <TeamDesc>
        <Position>설명</Position>
        {teamInfo.description}
      </TeamDesc>
      <MembersWrap>
        <Position>감독/코치</Position>
        <Members>
          {teamInfo.member.map((member) => (
            <Member>
              <img src={member.profile} alt={member.name} />
              <Backno>{member.backNumber}</Backno>
              <MemberName>{member.name}</MemberName>
            </Member>
          ))}
        </Members>
      </MembersWrap>
      <MembersWrap>
        <Position>GK</Position>
        <Members>
          {teamInfo.member.map((member) => (
            <Member>
              <img src={member.profile} alt={member.name} />
              <Backno>{member.backNumber}</Backno>
              <MemberName>{member.name}</MemberName>
            </Member>
          ))}
        </Members>
      </MembersWrap>
      <MembersWrap>
        <Position>DK</Position>
        <Members>
          {teamInfo.member.map((member) => (
            <Member>
              <img src={member.profile} alt={member.name} />
              <Backno>{member.backNumber}</Backno>
              <MemberName>{member.name}</MemberName>
            </Member>
          ))}
        </Members>
      </MembersWrap>
      <MembersWrap>
        <Position>MF</Position>
        <Members>
          {teamInfo.member.map((member) => (
            <Member>
              <img src={member.profile} alt={member.name} />
              <Backno>{member.backNumber}</Backno>
              <MemberName>{member.name}</MemberName>
            </Member>
          ))}
        </Members>
      </MembersWrap>
      <MembersWrap>
        <Position>FW</Position>
        <Members>
          {teamInfo.member.map((member) => (
            <Member>
              <img src={member.profile} alt={member.name} />
              <Backno>{member.backNumber}</Backno>
              <MemberName>{member.name}</MemberName>
            </Member>
          ))}
        </Members>
      </MembersWrap>
    </TeamInfoWrap>
  );
}

export default TeamInfoItem;
