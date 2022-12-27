import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//class Square extends React.Component {
  //no need for a class when all it does is render, since we don't keep any state in here we can just make a function 
  function Square(props){
    return (
      //changed from this.props to just props since it's not a class anymore
      <button className='square' onClick={props.onClick}> 
        {props.value}
      </button>
    );
    /*  
    no longer needed because the game state is stored in the board instead of in each square.
    constructor(props){
      super(props);
      this.state = {
        value: null,
      };
    }
    render() {
      return (
        //function syntax is below and arrow function syntax is the one below that, function one make sense since it's like java
        //<button className="square" onClick={ function() {console.log("click")}}>  
        //there are many things that can be done for the arrow function here
        <button 
          className="square" 
          onClick={() => this.props.onClick()}>  
          {this.props.value}  
        </button>
        //we changed from this.props.value to this.state.value to adapt to the current state's change when clicked when added constructor in square
        //whe you call setState in a component, react auto updates the child components inside of it too.
      );
    }
    */
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  

  //we will need to add history and in order to do that we will keep that info in the Game component
  //lifting it out of the board component now
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{squares: Array(9).fill(null)}],
        stepNumber: 0,
        xIsNext: true,
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
      console.log(this.state.history)
    }

    jumpTo(step)
    {
      this.setState({
        stepNumber: step,
        xIsNext: (step%2) === 0,
      })

    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start'; //here if move is not 0 then goes to move # else just game start which is beginning since move = 0
        return (
          <li key={move}>
            <button onClick = {() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        )
      });


      let status;
      if (winner)
      {
        status = 'Winner: ' + winner;
      }
      else
      {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

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
  