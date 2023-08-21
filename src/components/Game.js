import React from 'react'

import './Game.css'

const Game = ({verifyLetter}) => {
  return (
    <div>
      <h2>Game</h2>
      <button onClick={verifyLetter}>Finalizar Jogo</button>

    </div>

  )
}

export default Game