import styled from "styled-components";

export const NostraContainer = styled.div`
  left: 0;
  right: 0;
  padding: 0.7rem 0.5rem;
  height: 8.8rem;

  table {
    border-bottom: 1px solid #f4f4f4;
    display: inblock;
    margin: 0 auto;
    width: 95%;
    max-width: 25rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    color: #222222;

    tr {
      height: 1.5rem;
    }
  }

  .rank {
    color: #e95400;
    width: 10%;
  }

  .nickname {
    width: 50%;
  }
  .winBet {
    width: 30%;
  }
  .accurate {
    width: 10%;
  }
`;

export const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const NostraTitle = styled.div`
  display: flex;
  color: #002266;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;
