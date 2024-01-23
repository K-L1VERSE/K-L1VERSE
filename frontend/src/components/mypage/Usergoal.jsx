import React from "react";
import styled from "styled-components";

const UsergoalContainer = styled.div`
  display: flex;
  width: 390px;
  padding: 0px 16px;
  align-items: flex-start;
  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  padding: 12px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;

  border-radius: 4px;
  background: #f2f6fd;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 52px;
`;

const ItemTitleText = styled.div`
  color: var(--gray2, #595959);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ItemText = styled.div`
  color: var(--gray1, #222);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

function Usergoal({ user }) {
  return (
    <UsergoalContainer>
      <Item>
        <ItemContent>
          <ItemTitle>
            <ItemTitleText>골</ItemTitleText>
            <ItemText>{user.goal}</ItemText>
          </ItemTitle>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>
            <ItemTitleText>적중률</ItemTitleText>
            <ItemText>{user.accurate}%</ItemText>
          </ItemTitle>
        </ItemContent>
      </Item>
    </UsergoalContainer>
  );
}

export default Usergoal;
