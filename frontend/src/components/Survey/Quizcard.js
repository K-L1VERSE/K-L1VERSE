import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../styles/SurveyStyles/SurveyButton";
import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

import quiz from "../../pages/SurveyContent/question";

import "../../styles/SurveyStyles/Main";

const useStyles = makeStyles({
  title: {
    fontSize: 21,
    marginBottom: "10px",
    marginTop: "10px",
    textAlign: "center",
    fontFamily: "WarhavenB",
    color: "#ED5AB3",
  },
  button: {
    textAlign: "center",
    fontFamily: "WarhavenB_light",
    marginTop: "5%",
  },
});

const QuizCard = ({ match }) => {
  const classes = useStyles();
  const [curQuiz, setQuiz] = useState({});
  const [id, setId] = useState(0);
  const [member, setMember] = useState("");

  useEffect(() => {
    const num = parseInt(match.params.id);
    console.log(num);
    if (quiz) {
      setQuiz(quiz[num - 1]);
      setId(num + 1);
    }
  }, [match]);

  const getScore = (arr) => {
    let scoreNum = 5;
    arr.map((name) => {
      score[0][name] = +score[0][name] + scoreNum;
      scoreNum -= 1;
      if (score[0][name] > +score[1].maxScore) {
        score[1].maxScore = score[0][name];
        score[1].maxKlv = name;
      }
    });

    // Rest of your code...
  };

  return (
    <Question>
      <>
        <div className={classes.title}>{match.params.id}/6</div>
        <br />
        <div className={classes.title}>{curQuiz.question}</div>
        <br />
        {curQuiz.answer &&
          curQuiz.answer.map((item, index) => (
            <Link to={`/question/${id}`} key={index}>
              <Button
                className={classes.button}
                weight={"lighter"}
                width={"100%"}
                fontSize={"1.1em"}
                color={"white"}
                onClick={() => getScore(item.name)}
              >
                {item.text}{" "}
              </Button>
            </Link>
          ))}
      </>
    </Question>
  );
};

export default withRouter(QuizCard);
