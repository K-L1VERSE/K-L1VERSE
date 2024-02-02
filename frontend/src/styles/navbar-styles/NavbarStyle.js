import styled from "styled-components";

export const Text = styled.div`
  font-size: 0.7rem;
  margin-top: 0.2rem;
  color: #a9a9;
`;

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0.5rem 1.5rem 1.3rem 1.5rem;
  justify-content: space-between;
  border-top: 2px solid rgba(169, 169, 169, 0.2);
  background-color: white;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    background: radial-gradient(circle at center, #002fa5 40%, #002277 100%);
    padding: 9px 7px 7px 7.5px;
    border-radius: 50%;
  }

  transition: opacity 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 85%;
  }
`;

export const Contents = styled.div`
  /* background-color: red; */
  padding-bottom: 6rem;
`;
