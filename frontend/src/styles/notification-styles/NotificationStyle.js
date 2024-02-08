import styled from "styled-components";

export const HeaderContainer = styled.div`
  border-bottom: 1px solid #ebebeb;
`;

export const HeaderBox = styled.div`
  display: flex;
  padding: 1rem 1rem;
`;

export const HeaderImg = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;

export const HeaderText = styled.div`
  font-size: 1rem;
  font-family: "Pretendard-Bold";
  color: #002266;
  margin-left: 0.2rem;
`;

export const NotificationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.1rem;
  border-bottom: 1px solid #ebebeb;
  &:hover {
    cursor: pointer;
    background-color: #f3f8ff;
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 3rem;
  padding: 0.75rem 1rem 0.75rem 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  align-items: center;
  font-family: "Pretendard-Regular";
  justify-content: space-between;
`;

export const NotificationItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
`;

export const NotificationDeleteText = styled.div`
  font-size: 0.9rem;
  font-family: "Pretendard-Regular";
  color: #595959;
  cursor: pointer;
  width: 5%;
  text-align: center;
`;

export const NotificationIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
`;

export const NotificationMessage = styled.div`
  font-size: 0.9rem;
  font-family: "Pretendard-Regular";
  color: #595959;
`;

export const NotificationUserImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 1rem 1rem 1rem 1rem;
`;

export const NotificationUserNickname = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  margin-right: 0.1rem;
`;

export const NotificationMatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.5rem;
`;

export const NotificationMatchTeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NotificationMatchImg = styled.img`
  width: 1rem;
  height: 1rem;
  margin-bottom: 0.1rem;
`;

export const NotificationMatchText = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
`;

export const NotificationMatchVersus = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0.2rem 0 0.2rem;
`;
