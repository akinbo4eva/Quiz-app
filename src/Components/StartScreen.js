function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>The React quiz app </h2>
      <h3>{numQuestions} questions to test your skills</h3>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
