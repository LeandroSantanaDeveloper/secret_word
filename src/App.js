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

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)




  const pickWordAndpickedCategory = useCallback(() => {
    const categories = Object.keys(words)

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return [word, category]

  }, [words])

  // Game stages

  const startGame = useCallback(() => {

    clearLetterStates()

    const [word, category] = pickWordAndpickedCategory()
    let wordLettter = word.split("")
    wordLettter = wordLettter.map((letter) => letter.toLowerCase())

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLettter)

    setGameStage(stages[1].name)
  }, [pickWordAndpickedCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }
    if (letter.includes(normalizedLetter)) {
      setGuessedLetters((actual) => [
        ...actual, normalizedLetter
      ])
    } else {
      setWrongLetters((actual) => [
        ...actual, normalizedLetter
      ])

      setGuesses((actualGesses) => actualGesses - 1)
    }
  }

  function clearLetterStates() {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actual) => actual += 100)

      startGame()
    }

  }, [guessedLetters, letters, startGame])


  const retry = () => {
    setScore(0)
    setGuesses(guessesQtd)
    setGameStage(stages[0].name)
  }

  const guessesQtd = 3

  // Game stages

  return (
    <div className="App">
      {gameStage === 'start' &&
        <StartScreen start={startGame} />}
      {gameStage === 'game' &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score} />}
      {gameStage === 'end' &&
        <GameOver
          retry={retry}
          score={score} />}
    </div>
  );
}

export default App;
