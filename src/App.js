import './App.css';

import { useCallback, useEffect, useState } from 'react';


import StartScreen from './components/StartScreen';


import { wordsList } from './data/words';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }

]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const pickWordAndpickedCategory = () => {
    const categories = Object.keys(words)
   
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    const word = words[category][Math.floor(Math.random() * words[category].length)]

  }


  // Game stages

  const startGame = () => {

    pickWordAndpickedCategory()
    setGameStage(stages[1].name)
  }

  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }
  
  // Game stages

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen start={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
