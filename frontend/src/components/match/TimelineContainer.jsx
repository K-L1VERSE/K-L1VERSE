import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  TimelineWrap,
  TimeMin,
} from "../../styles/match-styles/MatchTimelinStyle";
import EventItem from "./EventItem";
// import TimelineItem from "./TimelineItem";

export default function TimelineConatiner(match, setMatch) {
  const [timelines, setTimelines] = useState([]);
  const { matchId } = useParams();
  const getTimeLines = (matchId) => {
    axios
      .get(`https://k-l1verse.site:8040/matches/timelines/${matchId}`)
      .then((res) => {
        setTimelines(res.data);
        if (res.data[res.data.length - 1].eventName === "득점") {
          const temp = match;
          if (res.data[res.data.length - 1].homeOrAway === "HOME") {
            temp.homeScore += 1;
          } else {
            temp.awayScore += 1;
          }
          setMatch(temp);
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
