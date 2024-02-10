import styled from "styled-components";

/* *********** 중고거래 리스트 ************ */
export const ProductItemWriter = styled.div`
  font-size: 0.8rem;
  color: darkslategray;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 1rem;
  margin-top: 1rem;
  padding: 0;
  font-family: "Pretendard-Regular";
  /* justify-content: space-between; */
`;

export const ProductItemContainer = styled.div`
  width: 10rem;
  height: 18rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  border: 0.8px solid lightblue;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
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
  aspect-ratio: 1;
  object-fit: cover;
  margin-bottom: 1rem;
`;
