// ProductListStyles.js
import styled from "styled-components";

export const ProductHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;
`;

export const ProductHeaderH2 = styled.h2`
  margin: 0 auto;
  width: auto;
  height: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #222222;
`;

export const ProductHeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProductHeaderButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 4px;
  border: none;
  background-color: transparent;
  margin: 0 auto;
  max-width: 40px;
  height: 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #002266;
  white-space: nowrap;
`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: flex-start;
`;

export const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-top: 20px;
  margin-left: 40px;
  text-align: left;
  text-decoration: none;
  color: inherit;
`;

export const DealStatus = styled.div`
  display: inline-block;
  width: 58px;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const DealStatusGreen = styled(DealStatus)`
  background-color: #4caf50;
  color: white;
`;

export const DealStatusOrange = styled(DealStatus)`
  background-color: #ff9800;
  color: white;
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

export const ProductItemCreatedAt = styled.div`
  height: 13px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #595959;
`;

export const ProductItemSeparator = styled.div`
  width: 380px;
  height: 1px;
  background: #f4f4f4;
  margin-top: 10px;
`;
