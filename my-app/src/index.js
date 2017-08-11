import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square is a controlled component: it receives its value from its parent (Board) and informs its parent when it is clicked
// class Square extends React.Component {  // this whole class can be defined as a function because it does not require a constructor
//   // constructor() {
//   //   super();
//   //   this.state = {
//   //     value: null,
//   //   }
//   // }
//
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   }
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = "Winner: " + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    // }

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

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // const squares = this.state.squares.slice();  // immutable data
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        "Move #" + move :
        "Game start";
      return (
        <li key={move}>
          <a href="#" onClick ={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <h2>Play Tic-Tac-Toe with React!</h2>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      </div>
    );
  }
}

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


class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      task: "",
      description: "",
      urgency: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // alert("The form changed.");
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  handleSubmit(event){
    event.preventDefault();
    var newEntry = {
      task: this.state.task,
      description: this.state.description,
      urgency: this.state.urgency,
      id: Date.now(),
    };
    this.setState((prevState) => ({
      entries: prevState.entries.concat(newEntry),
      task: "",
      description: "",
      urgency: "",
    }));
    // alert("The form was submitted.");
  }

  render() {
    return (
      <div>
        <h2>Create a To Do List</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Task: <input type="text" name="task" value={this.state.task} onChange={this.handleChange}/></label><br/>
          <label>Description: <textarea name="description" value={this.state.description} onChange={this.handleChange}></textarea></label><br/>
          <label>Urgency:
            <select value={this.state.urgency} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label><br/>
          <input type="submit" value={"Submit #" + (this.state.entries.length + 1)}/>
        </form>
        <Entries entries={this.state.entries} />
      </div>
    );
  }
}

class Entries extends React.Component {
  render() {
    return (
      <ul>
        {this.props.entries.map(entry => (
          <div key={entry.id}>
            <h4>{entry.task}</h4>
            <ul>
              <li>{entry.description}</li>
              <li>{entry.urgency}</li>
            </ul>
          </div>
        ))}
      </ul>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('tictactoe')
);

ReactDOM.render(
  <MyForm />,
  // <h1>Hello world</h1>,
  document.getElementById('root')
);
