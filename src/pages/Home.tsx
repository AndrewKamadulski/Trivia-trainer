import { Start } from "../components/Start";
import { Game } from "../components/Game";

type Questions = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_anwer: string;
  incorrect_answers: string[];
};

export const Home: React.FC<{
  gameOn: boolean;
  setGameOn: React.Dispatch<React.SetStateAction<boolean>>;
  questions: Questions;
  setQuestions: React.Dispatch<React.SetStateAction<Questions>>;
}> = ({ gameOn, setGameOn, questions, setQuestions }) => {

    console.log(window.screen.width);
  return (
    <>
    <div className="homepage-banner">
     <div className="neon-text display-1">Trivia Trainer</div>
     </div>
      <div className="homepage-container">
        
        {/* display game start modal */}
        <div className="start-modal text-center">
          {!gameOn && (
            <Start
              gameOn={gameOn}
              setGameOn={setGameOn}
              questions={questions}
              setQuestions={setQuestions}
            ></Start>
          )}
        </div>

        {/* display the game */}
        {gameOn && <Game setGameOn={setGameOn} questions={questions}></Game>}
      </div>
    </>
  );
};
