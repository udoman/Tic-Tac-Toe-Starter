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

    constructor(props){
      super(props);
      //created a constructors for Board in order to keep track of what is X and O or Null
      //we are using an array in this case started it with all null at first
      this.state = {
        squares: new Array(9).fill(null), 
        xIsNext: true,
      };
    }

    handleClick(i){
      const squares = this.state.squares.slice();
      //debugger;
      //two conditiosn is to exit early being that if what we just updated is the last piece to getting a tic tac toe
      //second condition is to account for when a user has already clicked it.
      //meaning that if square[i] != null then it will return
      //basically this statements translate to calculateWinner(squares) != null or squares[i] != null because then that will be true
      if (calculateWinner(squares) || squares[i]) //0 is false and if statement checks for True, null is false as well
      {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({squares:squares,
      xIsNext: !this.state.xIsNext, //we are this this.state.xIsNext because we want to update what it is currently and not just assume it will always be false
    });
    }

    //this is a function within a class, don't need function tag. 
    //he we just created a function to render a value using the square object.
    renderSquare(i) {
      //then here we are updating it accordingly, and since we can't update the value of the square
      //because the props of a component is private, we can pass it whenever that square is click.
      //basically when this square is clicked on the board, it will calls the click functionality in square?
      return <Square value={this.state.squares[i]}  //if you look at how square is using this.props.value and this.props.onClick, these stuff are just being passed into square from board
      onClick={() => this.handleClick(i)}
      />  //parent to child relationship here becuase board is the parent and is passing data to the child component aka square
    }
  
    //render here is the react function to pull components and it gets compiled to be shown on webpage
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner != null){
        status = 'Winner: ' + winner;
      }
      else
      {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

  
      return (
        <div>
          <div className="status">{status}</div>
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
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  