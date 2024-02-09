import React, { useEffect, useState } from "react";
import { Category, Title } from "../../styles/main-styles/MainStyle";
import {
  TeamPageWrap,
  TeamItem,
  TeamName,
  TeamWrap,
} from "../../styles/TeamStyles/TeamStyle";
import TeamInfoItem from "../../components/team/TeamInfoItem";
import { getTeamInfo } from "../../api/team";

function TeamInfoPage() {
  const teams = [
    {
      id: 1,
      name: "울산",
    },
    {
      id: 2,
      name: "포항",
    },
    {
      id: 3,
      name: "제주",
    },
    {
      id: 4,
      name: "전북",
    },
    {
      id: 5,
      name: "서울",
    },
    {
      id: 6,
      name: "대전",
    },
    {
      id: 7,
      name: "대구",
    },
    {
      id: 8,
      name: "인천",
    },
    {
      id: 9,
      name: "강원",
    },
    {
      id: 10,
      name: "광주",
    },
    {
      id: 11,
      name: "수원",
    },
    {
      id: 12,
      name: "김천",
    },
  ];

  const [selectedId, setSelectedId] = useState(1);
  const [teamInfo, setTeamInfo] = useState({
    teamId: 0,
    teamName: "",
    description: "",
    homepage: "",
    facebook: "",
    instagram: "",
    youtube: "",
    song: "",
  });
  const [coach, setCoach] = useState([]);
  const [gk, setGk] = useState([]);
  const [df, setDf] = useState([]);
  const [mf, setMf] = useState([]);
  const [fw, setFw] = useState([]);

  useEffect(() => {
    getTeamInfo(
      selectedId,
      ({ data }) => {
        setTeamInfo({
          teamId: data.teamId,
          teamName: data.teamName,
          description: data.description,
          homepage: data.homepage,
          facebook: data.facebook,
          instagram: data.instagram,
          youtube: data.youtube,
          song: data.song,
        });
        setCoach(data.members.filter((member) => member.position === "감독"));
        setGk(data.members.filter((member) => member.position === "gk"));
        setDf(data.members.filter((member) => member.position === "df"));
        setMf(data.members.filter((member) => member.position === "mf"));
        setFw(data.members.filter((member) => member.position === "fw"));
      },
      () => {},
    );
  }, [selectedId]);

  const clickId = (id) => {
    setSelectedId(id);
  };

  return (
    <TeamPageWrap>
      <Category>
        <Title>⚽️ 팀정보</Title>
      </Category>
      <TeamWrap>
        {teams.map((team) => (
          <TeamItem
            $focus={team.id === selectedId}
            key={team.id}
            onClick={() => clickId(team.id)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/badge/badge${team.id}.png`}
              alt={team.name}
            />
            <TeamName>{team.name}</TeamName>
          </TeamItem>
        ))}
      </TeamWrap>
      <TeamInfoItem
        teamInfo={teamInfo}
        coach={coach}
        gk={gk}
        df={df}
        mf={mf}
        fw={fw}
      />
    </TeamPageWrap>
  );
}

export default TeamInfoPage;
