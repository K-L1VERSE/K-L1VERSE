import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  padding: 1rem 0 1rem 0;
`;

export const TitleText = styled.div`
  padding: 0 0 1rem 1rem;
  color: var(--blue1, #026);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BadgeLineContainer = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BadgeBackground = styled.div`
  display: flex;
  width: 15%;
  margin-bottom: 0.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.$isSelected && "background-color: #e5edfb; border-radius: 0.25rem"};
  // &:hover {
  //   background-color: #e5edfb;
  //   border-radius: 0.25rem;
  // }
  border-radius: 0.25rem;
`;

export const BadgeText = styled.div`
  color: var(--gray1, #222);
  font-family: "Pretendard-Regular";
  font-size: 0.8rem;
`;

export const ConfirmContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

export const ConfirmTextContainer = styled.div`
  display: flex;
  padding: 0.75rem 1.5rem;
  width: 70%;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background-color: #3261c1;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export const ConfirmText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
`;

export const PurchaseTextContainer = styled.div`
  display: flex;
  width: 70%;
  padding: 0.75rem 1.5rem;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid #3261c1;
  background-color: #fff;
`;

export const PurchaseText = styled.div`
  color: #3261c1;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
`;

export const DisabledConfirmContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

export const DisabledTextContainer = styled.div`
  display: flex;
  width: 70%;
  padding: 0.75rem 1.5rem;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background-color: #f4f4f4;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

export const DisabledText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
`;

export const BigContainer = styled.div``;

export const BadgeImageStyle = ({ code, isBadgeEarned }) => {
  // const svgWidth = 2.5;
  // const svgHeight = 3.4375;
  // const imageWidth = 1.75;
  // const imageHeight = 1.75;
  // const imageX = (svgWidth - imageWidth) / 2;
  // const imageY = (svgHeight - imageHeight) / 2;

  return (
    <BigContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3.3rem"
        height="3.3rem"
        viewBox="0 0 44 44"
        fill="none"
      >
        {/* <g filter="url(#filter0_d_314_260)">
        <path
          d="M36.08 38.8533C37.2457 38.0449 38 36.6975 38 35.193L37.9771 10.4912C37.9771 8.02105 35.9429 6 33.4286 6L10.5714 6C8.05714 6 6.02286 8.02105 6.02286 10.4912L6 35.193C6 36.6975 6.75428 38.0449 7.92 38.8533L22 48.6667L36.08 38.8533Z"
          fill="white"
        />
        <path
          d="M35.966 38.689L35.9656 38.6893L22 48.4229L8.03436 38.6893L8.03397 38.689C6.92012 37.9165 6.20006 36.6296 6.2 35.1932C6.2 35.1931 6.2 35.193 6.2 35.193L6.22286 10.4914L6.22286 10.4912C6.22286 8.13354 8.16556 6.2 10.5714 6.2L33.4286 6.2C35.8344 6.2 37.7771 8.13354 37.7771 10.4912L37.7771 10.4914L37.8 35.193C37.8 36.6295 37.0799 37.9165 35.966 38.689Z"
          stroke="#002266"
          strokeWidth="0.4"
        />
      </g> */}

        <image
          href={`/badge/badge${code}back.png`}
          width="2.8rem"
          height="3rem"
          // x="-0.6rem"
          // y="0.5rem"
          filter={isBadgeEarned ? null : "url(#grayscaleFilter)"}
        />

        <defs>
          <filter id="grayscaleFilter">
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                            0.33 0.33 0.33 0 0
                            0.33 0.33 0.33 0 0
                            0    0    0    1 0"
            />
          </filter>
          <filter
            id="filter0_d_314_260"
            x="0"
            y="0"
            width="44"
            height="54.6665"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_314_260"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_314_260"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </BigContainer>
  );
};
