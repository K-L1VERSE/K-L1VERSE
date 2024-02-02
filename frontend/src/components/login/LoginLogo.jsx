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

  height: 20rem;

  justify-content: center;
  align-items: center;

  margin-top: 3rem;
`;

const Logo = styled.img`
  height: 20rem;
  width: 20rem;

  margin-left: 0.7rem;
`;

export default LoginLogo;
