import React, { useState, useEffect } from "react";
import {
  NostraContainer,
  NoData,
} from "../../styles/main-styles/NostradamusStyle";
import { getNostradamus } from "../../api/nostradamus";

export default function Nostradamus() {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    getNostradamus(
      ({ data }) => {
        setRank(data);
      },
      () => {},
    );
  }, []);

  return (
    <div>
      <NostraContainer>
        {rank.length > 0 ? (
          <table>
            <thead>
              <tr className="tableTitle">
                <td className="rank"></td>
                <td className="nickname">닉네임</td>
                <td className="winBet">횟수</td>
                <td className="accurate">적중률</td>
              </tr>
            </thead>
            <tbody>
              {rank.map((item, index) => (
                <tr key={index}>
                  <td className="rank">{index + 1}</td>
                  <td className="nickname">{item.nickname}</td>
                  <td className="winBet">{item.winBet}</td>
                  <td className="accurate">{item.accurate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData>데이터가 없습니다.</NoData>
        )}
      </NostraContainer>
    </div>
  );
}
