import { useEffect, useState } from "react";
import MyButton from "../MyButton/MyButton";
import Timer from "../Timer/Timer";
import styles from "./QuestionCard.module.css";

export type QuestionType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type AnswerType = {
  choice?: string;
  answerBody?: string;
};

export default function QuestionCard({
  question,
  newQuestion,
}: Readonly<{
  question: QuestionType;
  newQuestion: (answer?: AnswerType | "first") => void;
}>) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) {
      newQuestion();
      setTime(30);
    }
  }, [newQuestion, time]);

  const handleAnswer = (answer: string, index: number) => () => {
    newQuestion({
      choice: getStylish(index),
      answerBody: answer,
    });
    setTime(30);
  };

  const getStylish = (index: number) => {
    if (index === 0) return "A";
    if (index === 1) return "B";
    if (index === 2) return "C";
    if (index === 3) return "D";
  };

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <Timer time={time} setTime={setTime} />
      </div>
      <div className={styles.questionTitle}>Question:</div>
      <div className={styles.questionBody}>{question.body} ?</div>
      <div className={styles.choiceContainer}>
        {question.body.split(" ", 4).map((answer, index) => (
          <MyButton key={index} disabled={time > 20} onClick={handleAnswer(answer, index)}>
            <div>{`${getStylish(index)}-) ${answer}`}</div>
          </MyButton>
        ))}
      </div>
    </div>
  );
}
