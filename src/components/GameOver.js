import './GameOver.scss'

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>Fim do jogo!</h1>
      <h2>Sua pontuação foi: <span>{score}</span></h2>
      <button onClick = {retry}>Resetar jogo</button>
    </div>
  )
}

export default GameOver