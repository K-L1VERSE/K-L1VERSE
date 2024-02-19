import { createGlobalStyle } from "styled-components";
import "../../assets/fonts/font.css";

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Pretendard-Light';
  background-color: white;
  min-height: 100vh;
  overflow-y: scroll;
}

@media screen and (min-width: 700px) {
  body {
    margin : 0 auto;
    width: 390px;
  }
}
html {
  background-color: white;
}
`;

export default GlobalStyle;
