import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BadgeContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  gap: 0.625rem;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const BadgeImage = styled.img`
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
`;

function BadgeButton({ mainBadge, user }) {
  const navigate = useNavigate();
  const goBadge = () => {
    navigate("/badge", {
      state: { user },
    });
  };

  return (
    <div>
      <BadgeContainer>
        <BadgeImage
          onClick={goBadge}
          src={`/badge/badge${mainBadge || 0}back.png`}
          style={{ width: "1.8rem", height: "2.2rem" }}
        />
      </BadgeContainer>
    </div>
  );
}

export default BadgeButton;
