import React, { useState, useEffect } from "react";
import {
  Title,
  Type,
  Text,
  Post,
  Date,
  Wrap,
} from "../../styles/main-styles/BoardItemStyle";
import { getLatestWaggle } from "../../api/waggle";
import { getLatestProduct } from "../../api/product";
import { getLatestMate } from "../../api/mate";

export default function BoardItem() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // get waggle posts
    getLatestWaggle(({ data }) => {
      setPosts([...posts, data]);
      console.log(data);
    }),
      (error) => {
        console.error(error);
      };

    // get mates posts
    getLatestProduct(({ data }) => {
      setPosts([...posts, data]);
    }),
      (error) => {
        console.error(error);
      };

    // get produt posts
    getLatestWaggle(({ data }) => {
      setPosts([...posts, data]);
    }),
      (error) => {
        console.error(error);
      };
  }, []);

  console.log(posts);

  const category = [
    {
      type: "와글와글",
      text: "⚽️ 축구 경기 직관 후기를 들려주세요.",
    },
    {
      type: "직관메이트",
      text: "👋🏻 경기 직관 함께 할 메이트를 구합니다.",
    },
    {
      type: "중고거래",
      text: "📦 너에겐 필요 없지만 나에게 꼭 필요한 굿즈 구합니다.",
    },
  ];

  return (
    <div>
      {posts.map((type, idx) => (
        <Wrap>
          <Type>{category[idx].type}</Type>
          <Text>{category[idx].text}</Text>
          {type.map((post) => (
            <Post>
              <Title>{post.board.title}</Title>
              <Date>{post.board.createAt}</Date>
            </Post>
          ))}
        </Wrap>
      ))}
    </div>
  );
}
