import React from "react";
import { Link } from "react-router-dom";
import {
  MateItemTitle,
  MateItemContent,
  MateItemInfoSection,
  MateItemCreated,
} from "../../styles/BoardStyles/MateListStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../styles/BoardStyles/ProductListStyle";
import { ItemContainer } from "../../styles/BoardStyles/BoardStyle";

function MateItemCard({ mate }) {
  // const [matchDetail, setMatchDetail] = useState({});
  // function getMatchDetail() {
  //   getMatchDetail(mate.matchId).then(({ data }) => {
  //     setMatchDetail(data);
  //   });
  // }
  // useEffect(() => {
  //   getMatchDetail();
  // }, []);

  return (
    <ItemContainer>
      {mate.fullFlag ? (
        <DealStatusOrange>모집완료</DealStatusOrange>
      ) : (
        <DealStatusGreen>모집중</DealStatusGreen>
      )}
      <MateItemTitle>
        <Link
          to={`/mate/${mate.board.boardId}`}
          // style={{ textDecoration: "none", color: "black" }}
        >
          {mate.board.title}
        </Link>
      </MateItemTitle>
      <MateItemContent>
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{mate.board.content}</p>
        </Link>
      </MateItemContent>
      <MateItemInfoSection>
        <MateItemCreated>{mate.createAt}</MateItemCreated>
      </MateItemInfoSection>
    </ItemContainer>
  );
}

export default MateItemCard;
