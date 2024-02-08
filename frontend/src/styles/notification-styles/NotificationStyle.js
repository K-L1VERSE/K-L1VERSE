import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  width: 22.375rem;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 1rem;
  border-bottom: 1px solid #ebebeb;
`;

export const HeaderBox = styled.div`
  display: flex;
`;

export const HeaderImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const HeaderText = styled.div`
  font-size: 1.25rem;
  font-style: Pretendard;
  font-weight: 700;
  color: #002266;
  margin-left: 0.5rem;
`;

export const NotificationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20.375rem;
  height: 3rem;
  padding: 0.75rem 1rem 0.75rem 1rem;
  border: 1px solid #ebebeb;
  border-radius: 1rem 1rem 1rem 1rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
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
  font-weight: 400;
  color: #002266;
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
  font-weight: 400;
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

export const NotRecvNotificationTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NotRecvNotificationText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #002266;
`;
