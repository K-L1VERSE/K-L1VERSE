import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  TimelineWrap,
  TimeMin,
} from "../../styles/match-styles/MatchTimelinStyle";
import EventItem from "./EventItem";

export default function TimelineConatiner({ match, setMatch }) {
  const [timelines, setTimelines] = useState([]);
  const { matchId } = useParams();
  const getTimeLines = (matchId) => {
    axios
      .get(`https://k-l1verse.site:8040/matches/timelines/${matchId}`)
      // .get(`http://localhost:8040/matches/timelines/${matchId}`)
      .then((res) => {
        if (res.data) {
          setTimelines(res.data);

          let changeHomeScore = 0;
          let changeAwayScore = 0;

          res.data.forEach((timeline) => {
            if (timeline.eventName === "득점") {
              if (timeline.homeOrAway === "HOME") {
                changeHomeScore += 1;
              } else {
                changeAwayScore += 1;
              }
            }
          });
          if (
            match.homeScore !== changeHomeScore ||
            match.awayScore !== changeAwayScore
          ) {
            setMatch((prev) => ({
              ...prev,
              homeScore: changeHomeScore,
              awayScore: changeAwayScore,
            }));
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getTimeLines(matchId);

    const interval = setInterval(() => {
      getTimeLines(matchId);
    }, [10000]);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <TimelineWrap>
      <table>
        <thead />
        <tbody>
          {timelines.map((timeline, i) => (
            <tr key={i}>
              <td width="44%">
                {timeline.homeOrAway === "HOME" && (
                  <EventItem
                    eventName={timeline.eventName}
                    teamName={timeline.teamName}
                    memberName={timeline.playerName}
                    memberName2={timeline.playerName2}
                    backNo={timeline.backNo}
                    homeOrAway={timeline.homeOrAway}
                  />
                )}
              </td>
              <td width="12%">
                <TimeMin>{timeline.timeMin} &#8216;</TimeMin>
              </td>
              <td width="44%">
                {timeline.homeOrAway === "AWAY" && (
                  <EventItem
                    eventName={timeline.eventName}
                    teamName={timeline.teamName}
                    memberName={timeline.playerName}
                    memberName2={timeline.playerName2}
                    backNo={timeline.backNo}
                    homeOrAway={timeline.homeOrAway}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TimelineWrap>
  );
}
