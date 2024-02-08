import styled from "styled-components";

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1rem;
  padding: 0;
  justify-content: flex-start;
  font-family: "Pretendard-Regular";
  justify-content: space-between;
`;

export const ProductItemContainer = styled.div`
  margin-bottom: 1rem;
  text-align: left;
  text-decoration: none;
  color: inherit;
  border: 0.8px solid lightblue;
  border-radius: 5px;
  padding: 1rem;
`;

export const DealStatus = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
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

export const ProductItemWriter = styled.div`
  width: 100%;
  height: 17px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #a9a9a9;
  text-decoration: none;
  margin-bottom: 8px;
`;

export const ProductItemTitle = styled.div`
  width: 100%;
  height: 17px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #222222;
  text-decoration: none;
`;

export const ProductItemContent = styled.div`
  width: 100%;
  min-height: 34px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #a9a9a9;
  text-decoration: none;
  margin-bottom: 8px;
`;

export const ProductItemInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
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
