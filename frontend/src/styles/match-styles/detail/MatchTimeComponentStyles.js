import styled from "styled-components";

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

export const TimeComponent = styled.div`
  text-align: center;
  border-radius: 22px;
  background: radial-gradient(circle at center, #002fa5 10%, #002277 100%);
  color: white;

  padding: 9px 16px;

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export const DuringComponent = styled.div`
  text-align: center;
  border-radius: 22px;
  background: radial-gradient(circle at center, #002fa5 10%, #002277 100%);
  color: white;
  padding: 9px 16px;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export const DuringText = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 0.9rem;
`;

export const DoneComponent = styled.div`
  text-align: center;

  border-radius: 22px;
  background-color: #a9a9a9;
  color: white;

  padding: 9px 14px;
`;
