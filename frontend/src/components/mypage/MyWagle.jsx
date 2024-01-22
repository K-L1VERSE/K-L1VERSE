import React from "react";

function MyWagle({ wagles }) {
  console.log(wagles);

  const wagleList = wagles.map((wagle) => (
    <li key={wagle.boardId} className="wagle">
      <div>{wagle.title}</div>
      <div>{wagle.wagleId}</div>
      <div>{wagle.content}</div>
      <div>{wagle.createAt}</div>
      <div>{wagle.likeCount}</div>
      <div>{wagle.commentCount}</div>
      <div>{wagle.thumbnail}</div>
    </li>
  ));

  return <ul>{wagleList}</ul>;
}

export default MyWagle;
