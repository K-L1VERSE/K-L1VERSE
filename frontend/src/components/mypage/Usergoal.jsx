import React, { useEffect } from "react";
import styled from "styled-components";

const UsergoalContainer = styled.div`
  display: flex;
  padding: 0rem 1rem;
  gap: 0.75rem;
`;

const Item = styled.div`
  display: flex;
  padding: 0.75rem 0.625rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;

  border-radius: 0.25rem;
  background: #f2f6fd;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const ItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const ItemTitleText = styled.div`
  color: var(--gray2, #595959);
  font-family: "Pretendard-Regular";
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ItemText = styled.div`
  color: var(--gray1, #222);
  font-family: "Pretendard-Bold";
  font-size: 0.9rem;
`;

const AccurateImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

function Usergoal({ user }) {
  useEffect(() => {}, [user]);

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
            <ItemTitleText>응원 성공</ItemTitleText>
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
              <AccurateImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png" />
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
