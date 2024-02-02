import styled from "styled-components";

export const WaggleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;
`;

export const WaggleHeaderH2 = styled.h2`
  margin: 0 auto;
  width: auto;
  height: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #222222;
`;

export const WaggleHeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const WaggleHeaderButton = styled.button`
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

export const WaggleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: flex-start;
`;

export const WaggleItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-top: 20px;
  margin-left: 40px;
  text-align: left;
  text-decoration: none;
  color: inherit;
`;

export const WaggleItemWriter = styled.div`
  width: 100%;
  height: 17px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: black;
  text-decoration: none;
  margin-bottom: 8px;
`;

export const WaggleItemTitle = styled.div`
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

export const WaggleItemContent = styled.div`
  width: 100%;
  min-height: 34px; /* Adjust the value as needed */
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #a9a9a9;
  text-decoration: none;
`;

export const WaggleItemInfoSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px; /* Added margin-top */
`;

export const WaggleItemInfoItem = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #595959;
`;

export const WaggleItemSeparator = styled.div`
  width: 380px;
  height: 1px;
  background: #f4f4f4;
  margin-top: 10px;
`;
