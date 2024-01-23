import Error from "./Error";
import Header from "./Header";
import { useApi } from "../Hooks/useApi";
import Loader from "./Loader";
import Main from "./Main";
import { useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinshedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "completed":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: (state.status = "ready"),
        highScore: state.highScore,
      };
    case "seconds":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action is un known");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const question = questions[index];

  const numQuestions = questions.length;
  const maxPossiblePoint = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useApi(dispatch);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              points={points}
              maxPossiblePoint={maxPossiblePoint}
            />
            <Question
              index={index}
              question={question}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                index={index}
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinshedScreen
            index={index}
            points={points}
            maxPossiblePoint={maxPossiblePoint}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
