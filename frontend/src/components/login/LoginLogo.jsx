import React from "react";
import styled from "styled-components";

import Kl1verseLogoImg from "../../assets/K-L1VERSE.png";

function LoginLogo() {
  return (
    <LogoContainer>
      <Logo src={Kl1verseLogoImg} alt="로고" />
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  height: 10rem;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 8rem;
`;

export default LoginLogo;
