import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Type,
  Text,
  Post,
  Date,
  BoardItemWrap,
} from "../../styles/main-styles/BoardItemStyle";

function formatDate(date) {
  const d = new window.Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return [year, month, day].join("-");
}

function truncateText(text, maxLength) {
  if (text && text.length > maxLength) {
    return `${text.slice(0, maxLength)}..`;
  }
  return text;
}

export default function BoardItem({ type, posts }) {
  const navigate = useNavigate();
  const category = [
    {
      type: "와글와글",
      text: "⚽️ 축구 경기 직관 후기를 들려주세요.",
      route: "/waggle",
    },
    {
      type: "직관메이트",
      text: "👋🏻 경기 직관 함께 할 메이트를 구합니다.",
      route: "/mate",
    },
    {
      type: "중고거래",
      text: "📦 너에겐 필요 없지만 나에게 꼭 필요한 굿즈 구합니다.",
      route: "/product",
    },
  ];

  const goBoard = () => {
    navigate(`${category[type].route}`);
  };

  const goPost = (boardId) => {
    navigate(`${category[type].route}/${boardId}`);
  };

  return (
    <BoardItemWrap>
      <Type onClick={goBoard} type={type}>
        {category[type].type}
      </Type>
      <Text>{category[type].text}</Text>
      {posts.map((post, i) => (
        <Post key={i} onClick={() => goPost(post.board.boardId)}>
          <Title>{truncateText(post.board.title, 18)}</Title>
          <Date>{formatDate(post.board.createAt)}</Date>
        </Post>
      ))}
    </BoardItemWrap>
  );
}
