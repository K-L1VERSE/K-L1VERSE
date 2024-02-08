import React, { useEffect } from "react";
import styled from "styled-components";

const UsergoalContainer = styled.div`
  display: inline-flex;
  width: 358px;
  padding: 0px 16px;
  align-items: flex-start;
  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  padding: 12px 10px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;

  border-radius: 4px;
  background: #f2f6fd;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
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

const AccurateImg = styled.img`
  width: 20px;
  height: 20px;
`;

function Usergoal({ user }) {
  useEffect(() => {
    console.log("user 정보 수정");
  }, [user]);

  return (
    <UsergoalContainer>
      <Item>
        <ItemContent>
          <ItemTitle>
            <ItemTitleText>골</ItemTitleText>
          </ItemTitle>
          <ItemText>{user.goal}</ItemText>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>
            <ItemTitleText>베팅</ItemTitleText>
          </ItemTitle>
          <ItemText>
            {user.winBet} / {user.totalBet}
          </ItemText>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>
            <ItemTitleText>적중률</ItemTitleText>
            {user.accurate >= 80 ? (
              <AccurateImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png" />
            ) : user.accurate >= 60 ? (
              <AccurateImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Hand%20Over%20Mouth.png" />
            ) : user.accurate >= 40 ? (
              <AccurateImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Smiling%20Eyes.png" />
            ) : user.accurate >= 20 ? (
              <AccurateImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pleading%20Face.png" />
            ) : (
              <AccurateImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Sweat.png" />
            )}
          </ItemTitle>
          <ItemText>{user.accurate}%</ItemText>
        </ItemContent>
      </Item>
    </UsergoalContainer>
  );
}

export default Usergoal;
