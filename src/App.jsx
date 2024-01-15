/* eslint-disable react/prop-types */
import { useState } from "react"
import { 
  Button,
  ListItem, 
  Text, 
  UnorderedList, 
  Stack,
} from '@chakra-ui/react'


function Square({ value, onSquareClick }) {
  return(
    <Stack align='center' direction='row'>
      <Button
        mt={0}
        mb={0}
        size='xl'
        colorScheme='teal' 
        variant='outline' 
        className="square"
        _hover={{
          background: "white",
          color: "teal.500",
        }}
        onClick={onSquareClick}
        >
          { value }
    </Button>
    </Stack>
  )
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i){
    if (squares[i] || calculatorWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext){
      nextSquares[i] = "X"
    }else{
      nextSquares[i] = "O"
    }
    
    onPlay(nextSquares)
  }

  const winner = calculatorWinner(squares)
  let status;
  if(winner) {
    status = "Pemenang: " + winner
  }else {
    status = "Pemain Selanjutnya: " + (xIsNext ? "X" : "O")
  }

  return (
    <Stack align='center' className="container">
      <Stack  className="status">
        <Text 
          marginTop={10}
          fontSize="2rem"
          fontWeight="bold"
          fontFamily="roboto, sans-serif"
          lineHeight="2rem"
          color='teal'
         >
          {status}
        </Text>
      </Stack>
      <Stack m={10} p='unset' className="board">
          <Stack>
            <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
            <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
            <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
          </Stack>
          <Stack>
            <Square value={squares[3]} onSquareClick={()=> handleClick(3)} />
            <Square value={squares[4]} onSquareClick={()=> handleClick(4)} />
            <Square value={squares[5]} onSquareClick={()=> handleClick(5)} />
          </Stack>
          <Stack>
            <Square value={squares[6]} onSquareClick={()=> handleClick(6)} />
            <Square value={squares[7]} onSquareClick={()=> handleClick(7)} />
            <Square value={squares[8]} onSquareClick={()=> handleClick(8)} />
          </Stack>
      </Stack>
    </Stack>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquare = history[currentMove]

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length -1)
  }

  const moves = history.map((_squares, move) => {
    let description = ''
    if (move > 0 ) {
      description = 'Go to move#' + move
    }else{
      description = 'Restart'
    }

    return(
      <ListItem key={move}>
        <Button variant='outline' onClick={() => jumpTo(move)}>
          {description}
        </Button>
      </ListItem>
    )
  })

  return(
    <Stack display='flex' align='center' className="game">
      <Stack className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </Stack>
      <Stack margin={2}  className="game-info">
        <UnorderedList margin={2} listStyleType='none' gap={1}>{moves}</UnorderedList>
      </Stack>
    </Stack>
  )
}

function calculatorWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i =0; i < lines.length; i++){
    const [a, b, c] = lines[i]
    if (squares [a] && squares [a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null
}



export default Game
