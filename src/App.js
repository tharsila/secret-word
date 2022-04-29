/* CSS / SCSS */
import './App.scss';

/* React */
import { useCallback,useEffect ,useState } from 'react';

/* data */
import {wordsList} from './data/words';

/* Components */
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses,setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    /* pick a random category */
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    /* pick a random word */
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }

  /* stars the game */
  const startGame = () => {
    /* pick word and pick category*/
    const {word, category} = pickWordAndCategory();

    /* create an array of letters*/
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => (letter.toLowerCase()));
    
    /* fill states */
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

  /* process the letter input */
  const verifyLetter = ((letter) => {
    console.log(letter);
    const normalizedLetter = letter.toLowerCase();

    /* check if letter has alredy been utilized */
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }
    
    /* show guessed letters or remove a chance */
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ])
    }

  })

 

  /* restart the game */
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
     {gameStage === "start" &&  <StartScreen startGame = {startGame}/>}
     {gameStage === "game" && 
     <Game
      verifyLetter = {verifyLetter}
      pickedWord = {pickedWord}
      pickedCategory = {pickedCategory}
      letters = {letters}
      guessedLetters = {guessedLetters}
      wrongLetters = {wrongLetters}
      guesses = {guesses}
      score = {score}
     />}  
     {gameStage === "end" && <GameOver retry = {retry}/>}
    </div>
  );
}

export default App;
