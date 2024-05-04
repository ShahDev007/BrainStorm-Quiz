import React, { useState } from "react";
import { QuestionCard } from "./components/QuestionsCard";
import { fetchQuizQuestions } from "./API";
// Component
import { Difficulty, QuestionState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";
import { Button } from "@mui/material";
import { ResultCard } from "./components/ResultCard";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// export type transfer={Answe}
const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [scoreCard, setScoreCard] = useState(false);

  const startTrivia = async () => {
    setScore(0);
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(userAnswers.length, TOTAL_QUESTIONS);

    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);

      console.log(userAnswers.length);
      if (userAnswers.length == TOTAL_QUESTIONS - 1) {
        console.log("Inside");
        setGameOver(true);
      }
    }
  };

  const nextQuestion = () => {
    if (number == TOTAL_QUESTIONS) setGameOver(true);
    else setNumber((prev) => prev + 1);
  };

  const scoreCardStatus = () => {
    setScoreCard(true);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {
          gameOver && userAnswers.length == TOTAL_QUESTIONS ?
            <button className="start" onClick={startTrivia}>
              Start
            </button> : null
          
        }
        {gameOver || userAnswers.length == TOTAL_QUESTIONS ?
            <button className="start" onClick={startTrivia}>
              Start
            </button> : null
          }

        {gameOver ? null : <p className="score">Score: {score}</p>}
        <p>{loading ? "Loading Questions..." : null}</p>
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        ) : null}
      </Wrapper>
      {gameOver && userAnswers.length == TOTAL_QUESTIONS && !scoreCard && (
        <Button
          variant="contained"
          color="success"
          onClick={() => scoreCardStatus}
        >
          View my Scorecard
        </Button>
      )}

      {scoreCard && <ResultCard data={userAnswers} />}
    </>
  );
};

export default App;
