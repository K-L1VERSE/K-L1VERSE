import styled from "styled-components";

export const Text = styled.div`
  font-size: 0.7rem;
  margin-top: 0.2rem;
  color: ${(props) => (props.isSelected ? "#0000ff" : "#A9A9A9")};
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

export const navbarScheduleIcon = ({ isSelected }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6363 1.90909H16.6818V0H14.7727V1.90909H5.22726V0H3.31817V1.90909H2.36362C1.31362 1.90909 0.454529 2.76818 0.454529 3.81818V19.0909C0.454529 20.1409 1.31362 21 2.36362 21H17.6363C18.6863 21 19.5454 20.1409 19.5454 19.0909V3.81818C19.5454 2.76818 18.6863 1.90909 17.6363 1.90909ZM17.6363 19.0909H2.36362V6.68182H17.6363V19.0909Z"
        fill={isSelected ? "#0000ff" : "#A9A9A9"}
      />
    </svg>
  );
};

export const navbarTeamInfoIcon = ({ isSelected }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 3.3L12.35 2.35C14.17 2.91 15.72 4.11 16.73 5.69L16.34 7.03L14.99 7.49L11 4.7V3.3ZM7.65 2.35L9 3.3V4.7L5.01 7.49L3.66 7.03L3.27 5.69C4.28 4.12 5.83 2.92 7.65 2.35ZM5.08 15.11L3.94 15.21C2.73 13.81 2 11.99 2 10C2 9.88 2.01 9.77 2.02 9.65L3.02 8.92L4.4 9.4L5.86 13.74L5.08 15.11ZM12.5 17.59C11.71 17.85 10.87 18 10 18C9.13 18 8.29 17.85 7.5 17.59L6.81 16.1L7.45 15H12.56L13.2 16.11L12.5 17.59ZM12.27 13H7.73L6.38 8.98L10 6.44L13.63 8.98L12.27 13ZM16.06 15.21L14.92 15.11L14.13 13.74L15.59 9.4L16.98 8.93L17.98 9.66C17.99 9.77 18 9.88 18 10C18 11.99 17.27 13.81 16.06 15.21Z"
        fill={isSelected ? "#0000ff" : "#A9A9A9"}
      />
    </svg>
  );
};

export const navbarNotificationIcon = ({ isSelected }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99999 20C10.1282 20 11.0513 19.0769 11.0513 17.9487H6.94871C6.94871 19.0769 7.87178 20 8.99999 20ZM15.1538 13.8462V8.71795C15.1538 5.56923 13.482 2.93333 10.5385 2.2359V1.53846C10.5385 0.68718 9.85127 0 8.99999 0C8.14871 0 7.46153 0.68718 7.46153 1.53846V2.2359C4.52819 2.93333 2.84614 5.55897 2.84614 8.71795V13.8462L0.794861 15.8974V16.9231H17.2051V15.8974L15.1538 13.8462ZM13.1026 14.8718H4.89743V8.71795C4.89743 6.17436 6.44614 4.10256 8.99999 4.10256C11.5538 4.10256 13.1026 6.17436 13.1026 8.71795V14.8718Z"
        fill={isSelected ? "#0000ff" : "#A9A9A9"}
      />
    </svg>
  );
};

export const navbarMyPageIcon = ({ isSelected }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.25625C11.3775 2.25625 12.4938 3.3725 12.4938 4.75C12.4938 6.1275 11.3775 7.24375 10 7.24375C8.6225 7.24375 7.50625 6.1275 7.50625 4.75C7.50625 3.3725 8.6225 2.25625 10 2.25625ZM10 12.9437C13.5269 12.9437 17.2437 14.6775 17.2437 15.4375V16.7437H2.75625V15.4375C2.75625 14.6775 6.47312 12.9437 10 12.9437ZM10 0C7.37563 0 5.25 2.12562 5.25 4.75C5.25 7.37437 7.37563 9.5 10 9.5C12.6244 9.5 14.75 7.37437 14.75 4.75C14.75 2.12562 12.6244 0 10 0ZM10 10.6875C6.82937 10.6875 0.5 12.2787 0.5 15.4375V19H19.5V15.4375C19.5 12.2787 13.1706 10.6875 10 10.6875Z"
        fill={isSelected ? "#0000ff" : "#A9A9A9"}
      />
    </svg>
  );
};
