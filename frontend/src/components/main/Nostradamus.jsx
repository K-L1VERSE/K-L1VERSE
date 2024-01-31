import React, { useState, useEffect } from "react";
import { NostraContainer } from "../../styles/main-styles/NostradamusStyle";
import { getNostradamus } from "../../api/nostradamus";

export default function Nostradamus() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNostradamus(
      ({ data }) => {
        setData(data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <div>
      <NostraContainer>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td className="rank">{index + 1}</td>
                <td className="nickname">{item.nickname}</td>
                <td className="winBet">{item.winBet}</td>
                <td className="accurate">{item.accurate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </NostraContainer>
    </div>
  );
}