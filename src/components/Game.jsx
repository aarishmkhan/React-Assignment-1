import React, { useState} from "react"
import Board from "./Board";

function Game() {
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    
      }

    const [xIsNext, setNext] = useState(true)
    const [stepNumber,setStepNo] = useState(0)
    const [history,setHistory] = useState([Array(9).fill(null)])

    function handleClick(i) {
      const preHistory = history.slice(0, stepNumber + 1);
      const current = preHistory[preHistory.length - 1];
      const squares =current.slice();
      
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      
      else return (squares[i] = xIsNext ? 'X': 'O',
      setNext(!xIsNext),
      setStepNo(preHistory.length),
      preHistory.push(squares), 
      setHistory(preHistory)
      );
    }

    function jumpTo(step) {
      setStepNo(step);
      if ((step%2)===0){
        setNext(true);

      }
    }
    const preHistory = history;
    const current = preHistory[stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map((step, move) => {
      const desc = move ?  'Go to move #' + move : 'Restart game';
        return (
          <li key={move}>
            <button className="historyButton" onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current}
              onClick={(i) => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ul>{moves}</ul>
          </div>
        </div>
      );
    }

export default Game