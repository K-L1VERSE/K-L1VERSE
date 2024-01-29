import styled from "styled-components";

export const SurveyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  padding-top: 1rem;
`;

export const SurveyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #002fa5, #002277);
  width: 95%;
  max-width: 40rem;
  height: 5rem;
  border: none;
  border-radius: 4px;
  padding-top: 0.5rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const Img1 = styled.img`
  width: 50%;
  max-width: 10.5rem;
`;

export const Img2 = styled.img`
  width: 35%;
  max-width: 7.5rem;
`;
