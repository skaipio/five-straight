import React, { Component } from 'react';
import Board from './Board';
import SizeSelector from './SizeSelector';
import HighlightCounter from './HighlightCounter';
import Game from './Game';
import './Arena.css';

const AI_DELAY = 500; // ms
const INITIAL_BOARD_SIZE = 5;

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

class Arena extends Component {
  constructor(props) {
    super(props);
    this.bindMethods.bind(this)();
    const game = new Game(INITIAL_BOARD_SIZE);
    const state = getFreshState(game);
    state.artificialIntelligenceEnabled = true;
    this.state = state;
    this.state.board = this.createNewBoard(this.state.game.boardSize);
    this.playerHasWon = false;
    this.boardKey = 0;
    this.clickTriggers = new Array(INITIAL_BOARD_SIZE*INITIAL_BOARD_SIZE);
  }

  bindMethods() {
    this.registerTriggerClick = this.registerTriggerClick.bind(this);
    this.onTurnChange = this.onTurnChange.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.createNewBoard = this.createNewBoard.bind(this);
  }

  handleSizeChange(e) {
    const val = parseInt(e.target.value);
    const game = new Game(val);
    const state = getFreshState(game);
    state.board = this.createNewBoard(game.boardSize);
    this.setState(state);
  }

  onTurnChange(index) {
    if (!this.state.playerHasWon) {
      const result = this.state.game.move(index);
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

  /**
   * For being able to trigger a click manually on the BoardCells.
   * Required for AI to make a move
   * click is the trigger function of ith board cell
   */
  registerTriggerClick(click, i) {
    this.clickTriggers[i] = click;
  }

  createNewBoard(boardSize) {
    // Increment boardKey so that React
    // understands that we want a new board
    return (
      <Board
      key={this.boardKey++}
      initialSize={boardSize}
      onCellClick={this.onTurnChange}
      registerTriggerClick={this.registerTriggerClick}/>
    );
  }

  resetGame() {
    this.state.game.reset();
    const boardSize = this.state.game.boardSize;
    this.clickTriggers = new Array(boardSize*boardSize)
    this.setState({
      turn: this.state.game.turn,
      playerHasWon: false,
      board: this.createNewBoard(boardSize)
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.player != this.state.player &&
        this.state.artificialIntelligenceEnabled &&
        this.state.player === 1) {
      const aiMove = this.state.game.getAiMove();
      // Add a little timeout to give the AI an inkling of humanity
      setTimeout(this.clickTriggers[aiMove], AI_DELAY);
    }
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
        <HighlightCounter label="Turn " count={this.state.turn} />
        <div className="Flex">
          <HighlightCounter label="Player 1" count={this.state.playerOneWins} vertical={true} />
          {this.state.board}
          <HighlightCounter label="Player 2" count={this.state.playerTwoWins} vertical={true} />
        </div>
        <button className="Reset button" onClick={this.resetGame}>Reset</button>
      </div>
    );
  }
}

export default Arena;
