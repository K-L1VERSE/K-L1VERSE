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

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 22.375rem;
  height: 2rem;
  padding: 0.75rem 1rem 0.75rem 1rem;
  border: 1px solid #ebebeb;
  align-items: center;
  font-family: "Pretendard-Regular";
`;

export const NotificationIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
`;

export const NotificationMessage = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;
