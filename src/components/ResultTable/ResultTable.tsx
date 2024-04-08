import { StateType } from "../../App";
import { AnswerType, QuestionType } from "../QuestionCard/QuestionCard";
import styles from "./ResultTable.module.css";

type QuestionAnswerType = QuestionType & AnswerType;

export default function ResultTable({
  questions,
  setState,
}: Readonly<{
  questions: QuestionAnswerType[];
  setState: (state: StateType) => () => void;
}>) {
  return (
    <div className={styles.container}>
      {questions?.map((QA) => (
        <div key={QA.id} className={styles.qaContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.title}>Question: &ensp;</div>
            <div>{QA.body}</div>
          </div>
          <div className={styles.answerContainer}>
            <div className={styles.answerContainer}>Answer: &ensp;</div>
            <div>{QA?.answerBody ? `${QA?.answerBody} (${QA?.choice})` : "No answer"} </div>
          </div>
        </div>
      ))}
      <button className={styles.againButton} onClick={setState("active")}>
        {questions.length === 100 ? "Questions Are Over" : "Again"}
      </button>
    </div>
  );
}
