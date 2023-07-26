import { useState } from 'react';
import './App.css'
import { Home } from './pages/Home'

function App() {
  const [gameOn, setGameOn] = useState(false)
  const [questions, setQuestions] = useState()  
  return (
    <>
    <div className="App"> 
    <Home
    gameOn= {gameOn}
    setGameOn = {setGameOn}
    questions = {questions}
    setQuestions = {setQuestions}
    ></Home>
 </div>
 </>
  );
}

export default App;
