import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  BackButton,
  Button,
  Container,
  DetailBox,
  DetailTop,
  EditDeleteButton,
  User,
  UserProfile,
  UserBadge,
  DetailCommentCount,
  Gray,
  CreateAt,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import { deleteMate } from "../../../api/mate";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../../styles/BoardStyles/ProductListStyle";
import {
  MatchTime,
  MatchTitle,
  MateDetailContent,
  MateDetailTitle,
  MateDetailTotal,
} from "../../../styles/BoardStyles/MateListStyle";
import { getMatchDetail } from "../../../api/match";
import { ItemTitle } from "../../../styles/BoardStyles/BoardStyle";
import {
  formatDateTime,
  formatDateTime2,
} from "../../../components/board/dateFormat";
import { UserState } from "../../../global/UserState";
import {
  DeleteButton,
  EditButton,
} from "../../../styles/BoardStyles/CommentStyle";
import BackIcon from "../../../assets/icon/back-icon.png";

function MateDetailPage() {
  const [mateDetail, setMateDetail] = useState({});
  const [matchId, setMatchId] = useState(0);
  const [total, setTotal] = useState(0);
  const [fullFlag, setFullFlag] = useState(false);
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [matchDetail, setMatchDetail] = useState(undefined);
  const [homeTeamName, setHomeTeamName] = useState("");
  const [awayTeamName, setAwayTeamName] = useState("");
  const [matchAt, setMatchAt] = useState("");

  const { userId } = useRecoilState(UserState)[0];

  const location = useLocation();
  const { state } = location;

  /* mate 상세 정보 가져오기 */
  function getMateDetail() {
    axios.get(`/board/mates/${boardId}`).then(({ data }) => {
      setMatchDetail(data);
      setMatchId(data.matchId);
      setMateDetail(data.board);
      setTotal(data.total);
      setFullFlag(data.fullFlag);
    });
  }

  useEffect(() => {
    getMateDetail();
  }, [boardId]);

  console.log(mateDetail);
  function getMatch() {
    if (matchId) {
      getMatchDetail(matchId).then((res) => {
        setMatchDetail(res);
        setHomeTeamName(res.homeTeamName);
        setAwayTeamName(res.awayTeamName);
        setMatchAt(res.matchAt);
      });
    }
  }
  useEffect(() => {
    getMatch();
  }, [matchId]);

  const createAt = new Date(mateDetail.createAt);

  const handleUpdateBtn = () => {
    if (state && state.fromMypage) {
      navigate("/mateRegist", {
        state: {
          board: mateDetail,
          total,
          fullFlag,
          matchId,
          user: state.user,
          fromMypage: state.fromMypage,
          category: state.category,
        },
      });
    } else {
      navigate("/mateRegist", {
        state: { board: mateDetail, total, fullFlag, matchId },
      });
    }
  };

  const handleDeleteBtn = () => {
    Swal.fire({
      html: `
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Bear.png" alt="Bear" width="100" height="100"/>
        <p style='font-size:1.2rem; font-family:Pretendard-Bold;'>게시글을 삭제하시겠습니까?</p>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>삭제</div>",
      cancelButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>취소</div>",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMate(
          boardId,
          () => {
            if (state && state.fromMypage) {
              navigate("/mypage", {
                state: {
                  user: state.user,
                  category: state.category,
                },
              });
            } else {
              navigate("/mate");
            }
          },
          () => {},
        );
      }
    });
  };

  const renderEditDeleteButtons = () => {
    if (userId === mateDetail.userId) {
      return (
        <>
          <EditButton type="button" onClick={handleUpdateBtn}>
            수정
          </EditButton>
          <DeleteButton type="button" onClick={handleDeleteBtn}>
            삭제
          </DeleteButton>
        </>
      );
    }
    return null;
  };

  const handleBackClick = () => {
    if (state && state.fromMypage) {
      navigate("/mypage", {
        state: {
          user: state.user,
          category: state.category,
        },
      });
    } else {
      navigate("/mate");
    }
  };

  return (
    <div>
      {matchDetail && homeTeamName && awayTeamName && matchAt && (
        <Container>
          <DetailTop>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="Back" />
            </BackButton>
            <MateBoardTitle>
              <div>직관 메이트 &nbsp;</div>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Call%20Me%20Hand%20Medium-Light%20Skin%20Tone.png"
                alt="Call Me Hand Medium-Light Skin Tone"
                width="18"
                height="18"
              />
            </MateBoardTitle>
          </DetailTop>
          <UserBar>
            <UserName>
              <UserProfile src={mateDetail.profile} />
              <UserNick>{mateDetail.nickname}</UserNick>
              <UserBadge
                src={`${process.env.PUBLIC_URL}/badge/badge${mateDetail.mainBadge === null ? 0 : mateDetail.mainBadge}back.png`}
              />
            </UserName>
            {fullFlag ? (
              <DealStatusOrange>모집완료</DealStatusOrange>
            ) : (
              <DealStatusGreen>모집중</DealStatusGreen>
            )}
          </UserBar>
          <DetailBox>
            <div style={{ marginBottom: "5px" }}>
              <MatchTitle>
                {homeTeamName} vs {awayTeamName}
              </MatchTitle>
            </div>
            <MatchTime>
              {formatDateTime(matchAt)} 경기 <div>🥅</div>
            </MatchTime>
            <ForSpaceBetween>
              <CreateAt>
                <div>{formatDateTime2(createAt)}</div>
              </CreateAt>
              <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
            </ForSpaceBetween>
            <MateDetailTitle>{mateDetail.title}</MateDetailTitle>
            <MateDetailContent>{mateDetail.content}</MateDetailContent>
            <MateDetailTotal>총 인원 : {total}</MateDetailTotal>
            <Bottom>
              <DetailCommentCount>
                <div>
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
                    alt="Love Letter"
                    width="25"
                    height="25"
                  />
                  댓글 수 {mateDetail.commentCount}
                </div>
              </DetailCommentCount>
            </Bottom>
            <Gray />
          </DetailBox>

          <CommentList boardId={boardId} />
        </Container>
      )}
    </div>
  );
}

export default MateDetailPage;

export const MateBoardTitle = styled.div`
  display: flex;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  background-color: #e3faef;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  align-items: center;
  color: #16b368;

  img {
    margin-bottom: 0.3rem;
  }
`;

export const UserBar = styled.div`
  display: flex;
  /* margin-left: 1rem; */
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
`;

export const UserName = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: #595959;
  align-self: center;
  margin-right: 0.5rem;
`;

export const UserNick = styled.div`
  font-family: "Pretendard-Bold";
  align-self: center;
  font-size: 0.9rem;
  margin-right: 0.1rem;
  color: black;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  // margin-top: 1rem;
`;

export const ForSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.3px solid #ccc;
`;
