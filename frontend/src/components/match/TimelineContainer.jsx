import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  TimelineWrap,
  TimeMin,
} from "../../styles/match-styles/MatchTimelinStyle";
import EventItem from "./EventItem";
// import TimelineItem from "./TimelineItem";

export default function TimelineConatiner() {
  const [timelines, setTimelines] = useState([]);
  const { matchId } = useParams();
  const getTimeLines = (matchId) => {
    axios
      .get(`http://70.12.246.226:8040/matches/timelines/${matchId}`)
      .then((res) => {
        setTimelines(res.data);
      })
      .catch(() => {});
  };

  setInterval(() => {
    getTimeLines(matchId);
    console.log(timelines);
  }, [10000]);

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
