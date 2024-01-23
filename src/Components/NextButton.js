function NextButton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next Question
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "completed" })}
      >
        Finished
      </button>
    );
}

export default NextButton;
