import axios from "axios";
import { useEffect, useState } from "react";
import MyButton from "./components/MyButton/MyButton";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import ResultTable from "./components/ResultTable/ResultTable";

type QuestionType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type AnswerType = {
  choice?: string;
  answerBody?: string;
};

type QuestionAnswerType = QuestionType & AnswerType;

export type StateType = "notActive" | "active" | "finish";

function App() {
  const [testState, setTestState] = useState<StateType>("notActive");
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [questions, setQuestions] = useState<QuestionAnswerType[]>([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res: any) => {
      if (res.data) setAllQuestions(res.data);
    });
  }, []);

  const setNewQuestion = (answer?: AnswerType | "first") => {
    if (questions.length === 100) return setTestState("finish");

    if (answer !== "first") {
      const tempQuestions = questions;
      const QA = { ...tempQuestions[tempQuestions.length - 1], ...answer };
      tempQuestions.pop();
      tempQuestions.push(QA);
      setQuestions(tempQuestions);
      if (tempQuestions.length % 10 === 0) {
        return setTestState("finish");
      }
    }

    let loopState: boolean;
    do {
      const randomId = Math.ceil(Math.random() * 100);
      const question = allQuestions.find((q) => q.id === randomId);
      loopState = Boolean(questions.find((q) => q.id === randomId));
      if (!loopState && question) setQuestions((prev) => [...prev, question]);
    } while (loopState);
  };

  const handleState = (state: StateType) => () => {
    setTestState(state);
    if (state === "active") {
      setNewQuestion("first");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
      {testState === "notActive" && <MyButton onClick={handleState("active")}>Start Test</MyButton>}
      {testState === "active" && (
        <QuestionCard question={questions?.[questions?.length - 1]} newQuestion={setNewQuestion} />
      )}
      {testState === "finish" && <ResultTable questions={questions} setState={handleState} />}
    </div>
  );
}

export default App;
