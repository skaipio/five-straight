//import { combineReducers } from 'redux';
import Game from '../Game';

/*
const gameApp = combineReducers({
  board,
  game
})
*/

const playerFromTurn = (turn) => turn % 2 === 0 ? 1 : 2;

const getNextMoves = (moves, index, player) => {
  moves = Array.from(moves);  // copy to keep immutability
  moves[index] = player;
  return moves;
}

const getWinState = (moves, boardSize, wins, index, player) => {
  const winState = {};
  const playerWon = Game.hasStraightAtIndex(moves, boardSize, index, player);
  if (playerWon) {
    winState.playerWon = player;
    winState.wins = Array.from(wins);
    winState.wins[player - 1] += 1;
  }
  return winState;
}

const stateFromCellClick = (state, action) => {
  if (state.playerWon || state.moves[action.index] !== 0) {
    return state;
  }
  const player = playerFromTurn(state.turn);
  const moves = getNextMoves(state.moves, action.index, player);
  const winState = getWinState(moves, state.size, state.wins, action.index, player);
  return {
    ...state,
    ...winState,
    size: state.size,
    moves: moves,
    turn: state.turn + 1
  }
}

const initGame = () => ({
  size: 5,
  turn: 0,
  wins: [0, 0],
  aiEnabled: true
})

const resetGame = (state, action) => {
  const boardSize = !!action.boardSize ? action.boardSize : state.size;
  return {
    ...state,
    size: boardSize,
    moves: Array(boardSize * boardSize).fill(0),
    turn: 0,
    playerWon: 0
  }
}

const gameApp = (state, action) => {
  if (typeof state === 'undefined') {
    return initGame();
  }

  switch (action.type) {
    case 'CELL_CLICK':
      return stateFromCellClick(state, action);
    case 'RESET_GAME':
    case 'SELECT_BOARD_SIZE':
      return resetGame(state, action);
    default:
      return state;
  }
}

export default gameApp;
