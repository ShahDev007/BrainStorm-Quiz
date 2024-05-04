import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
type props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};
export const QuestionCard: React.FC<props> = ({
  questionNumber,
  totalQuestions,
  question,
  answers,
  callback,
  userAnswer,
}) => {
  return (
    <>
      <Wrapper>
        <p className="number">
          Question:{questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        {/* <p>question</p> */}
        <div>
          {answers.map((answer) => {
            return (
              <ButtonWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}
              >
                <button
                  disabled={userAnswer ? true : false}
                  value={answer}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                  {/* {answer} */}
                </button>
              </ButtonWrapper>
            );
          })}
        </div>
      </Wrapper>

      </>
  );
};
