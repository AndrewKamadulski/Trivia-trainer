import { useState } from "react";

var correct = 0;

export const Game = ({ setGameOn, questions }) => {
  const [counter, setCounter] = useState(0);
  console.log(questions);
  // decode unicode characters from API

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  let questionString = "";
  let answerArray = [];
  if (questions) {
    questionString = decodeHtml(JSON.stringify(questions[counter].question));

    // API returns an object with a correct_answer key:value pair where the correct answer is a single value
    // and the incorrect_answers key:value pair has a value that is an array with multiple answer strings
    // add the correct and incorrect answers to the answerArray
    answerArray.push(...questions[counter].incorrect_answers);
    answerArray.push(questions[counter].correct_answer);

    // Fisher-Yates Shuffle of answerArray to randomize
    const shuffle = (array) => {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    };
    shuffle(answerArray);
  }

  const checkAnswer = (e) => {
    if (e.target.innerText == questions[counter].correct_answer) {
      correct = correct + 1;
      e.target.innerText = "Correct ! ";
      console.log(correct);
    } else {
      e.target.innerText =
        "The Answer is " + decodeHtml(questions[counter].correct_answer);
    }

    setTimeout(function () {
      if (counter < questions.length - 1) {
        setCounter(counter + 1);
      } else {
        quitGame();
      }
    }, 2000);
  };

  const quitGame = () => {
    setGameOn(false);
    correct = 0;
  };

  return (
    <>
      {!questions && <div className="loading neon-text">Loading....</div>}

      {questions && (
        <div className="game-container">
          <div className="question-container neon-text">
            {questionString.slice(1, -1)}
          </div>
          <div className="answer-container">
            {answerArray.map((answer, index) => {
              return (
                <div className="answer-btn" key={index}>
                  <button
                    type="button"
                    onClick={checkAnswer}
                    className="btn answer neon-btn"
                  >
                    {decodeHtml(answer)}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="question-counter neon-text">
            {" "}
            Question: {counter + 1} / {questions.length} &nbsp; &nbsp; Correct:{" "}
            {correct}
          </div>
        </div>
      )}

      <div className="quit-game">
        <button type="button" onClick={quitGame} className="btn neon-btn">
          Quit Game
        </button>
      </div>
    </>
  );
};
