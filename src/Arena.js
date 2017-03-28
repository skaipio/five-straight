import React, { Component } from 'react';
import Board from './Board';
import SizeSelector from './SizeSelector';
import HighlightCounter from './HighlightCounter';
import Game from './Game';
import './Arena.css';

function Winner(props) {
  return <h2>Player {props.winner} has won!</h2>;
}

function getFreshState(game) {
  return {
    game: game,
    turn: game.turn,
    playerOneWins: 0,
    playerTwoWins: 0
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    const game = new Game(5);
    this.state = getFreshState(game);
    this.onTurnChange = this.onTurnChange.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.createNewBoard = this.createNewBoard.bind(this);
    this.state.board = this.createNewBoard(this.state.game.boardSize);
    this.playerHasWon = false;
    this.boardKey = 0;
  }

  handleSizeChange(e) {
    const val = parseInt(e.target.value);
    const game = new Game(val);
    const state = getFreshState(game);
    state.board = this.createNewBoard(game.boardSize);
    this.setState(state);
  }

  onTurnChange(x, y) {
    if (!this.state.playerHasWon) {
      const result = this.state.game.move(x, y);
      const newState = {
        playerHasWon: result.playerWon,
        player: result.player,
        turn: this.state.game.turn
      };
      if (result.playerWon) {
        let winnerKey = result.player === 1 ? 'playerOneWins' : 'playerTwoWins';
        newState[winnerKey] = this.state[winnerKey] + 1;
      }
      this.setState(newState);
      return result.player;
    }
    return 0;
  }

  createNewBoard(boardSize) {
    // Increment boardKey so that React
    // understands that we want a new board
    return (
      <Board
      key={this.boardKey++}
      initialSize={boardSize}
      onCellClick={this.onTurnChange}/>
    );
  }

  resetGame() {
    this.state.game.reset();
    this.setState({
      turn: this.state.game.turn,
      playerHasWon: false,
      board: this.createNewBoard(this.state.game.boardSize)
    });
  }

  render() {
    return (
      <div className="VerticalFlex Regular">
        <div>
          <h2 className="UpperCase">Five straight</h2>
        </div>
        <SizeSelector onSizeSelect={this.handleSizeChange} />
        <div className="WinnerDisplay">
          {this.state.playerHasWon ? <Winner winner={this.state.player}/> : null}
        </div>
        <HighlightCounter label="Turn: " count={this.state.turn} />
        <div className="Flex">
          <HighlightCounter label="Player 1: " count={this.state.playerOneWins} />
          {this.state.board}
          <HighlightCounter label="Player 2: " count={this.state.playerTwoWins} />
        </div>
        <button className="Reset button" onClick={this.resetGame.bind(this)}>Reset</button>
      </div>
    );
  }
}

export default App;
