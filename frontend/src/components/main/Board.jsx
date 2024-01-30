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
    // get waggle posts
    getLatestWaggle(({ data }) => {
      setWaggle(data);
    }),
      (error) => {
        console.error(error);
      };
    // get mate posts
    // getLatestMate(({ data }) => {
    //   setMate(data);
    //   console.log("mate", data);
    // }),
    //   (error) => {
    //     console.error(error);
    //   };
    // get product posts
    getLatestProduct(({ data }) => {
      setProduct(data);
    }),
      (error) => {
        console.error(error);
      };
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
