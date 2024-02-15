import React, { useState, useEffect } from "react";
import { getLatestWaggle } from "../../api/waggle";
import { getLatestMate } from "../../api/mate";
import { getLatestProduct } from "../../api/product";
import BoardItem from "./BoardItem";
import { BoardWrap } from "../../styles/main-styles/BoardItemStyle";

function Board() {
  const [waggle, setWaggle] = useState([]);
  const [mate, setMate] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getLatestWaggle((res) => {
      if (res && res.data) {
        setWaggle(res.data);
      }
    }),
      () => {};
    getLatestMate((res) => {
      if (res && res.data) {
        setMate(res.data);
      }
    }),
      () => {};
    getLatestProduct((res) => {
      if (res && res.data) {
        setProduct(res.data);
      }
    }),
      () => {};
  }, []);

  return (
    <BoardWrap>
      <BoardItem type={0} posts={waggle} />
      <BoardItem type={1} posts={mate} />
      <BoardItem type={2} posts={product} />
    </BoardWrap>
  );
}

export default Board;
