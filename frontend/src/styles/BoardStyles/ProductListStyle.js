import styled from "styled-components";

/* *********** 중고거래 리스트 ************ */
export const ProductItemWriter = styled.div`
  font-size: 0.8rem;
  color: darkslategray;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;

export const ForWidth = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 0.2rem;
`;

export const ProductListContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 22rem;
  height: auto;
  margin-top: 1rem;
  font-family: "Pretendard-Regular";
  @media (min-width: 768px) {
    width: 600px;
  }
`;

export const ProductItemContainer = styled.div`
  width: 10.4rem;
  margin-bottom: 1rem;
  margin-right: 0.4rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  border: 1px solid lightblue;
  border-radius: 5px;
  padding: 0.8rem;
  box-sizing: border-box;
  @media (min-width: 768px) {
    margin-right: 0.5rem;
    width: 11.8rem;
  }
`;

export const DealStatus = styled.div`
  display: inline-block;
  font-size: 0.7rem;
  padding: 5px 5px;
  border-radius: 5px;
  margin-bottom: 0.1rem;
  text-align: center;
`;

export const DealStatusGreen = styled(DealStatus)`
  background-color: #4caf50;
  color: white;
`;

export const DealStatusOrange = styled(DealStatus)`
  background-color: #ff9800;
  color: white;
  text-align: center;
`;

export const ProductItemPrice = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #002266;
`;

export const ProductItemComment = styled.div`
  height: 13px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #595959;
`;

export const ProductItemCreated = styled.div`
  font-size: 0.7rem;
  margin-right: 0.7rem;
  margin-bottom: 0.5rem;
  color: #595959;
`;

/* *********** ProdcutDetail *********** */
export const ProductWriter = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

export const ProductDetailTitle = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ProductDetailContent = styled.p`
  margin: 0;
`;

export const ProductDetailPrice = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #333;
`;

export const ProductImage = styled.img`
  width: 100%;
  /* height: auto; */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;
