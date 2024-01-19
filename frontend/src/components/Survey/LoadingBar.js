// // LoadingBar.js
// import React, { useState } from "react";
// import {
//   Progress,
//   Done,
//   Text,
// } from "../../styles/SurveyStyles/LoadingBarStyle";

// const LoadingBar = ({ done }) => {
//   console.log("LoadingBar rendering");
//   const [style, setStyle] = useState({});
//   setTimeout(() => {
//     const newStyle = {
//       opacity: 1,
//       width: `${done}%`,
//     };
//     setStyle(newStyle);
//   }, 300);

//   return (
//     <Progress>
//       <Text>
//         나와 비슷한
//         <br />
//         <Text style={{ fontSize: "1.7em", color: "#001B79" }}>케이리그</Text>
//         <br />
//         구단을 분석 중입니다.
//       </Text>
//       <Done style={style}>{done}%</Done>
//     </Progress>
//   );
// };

// export default LoadingBar;
