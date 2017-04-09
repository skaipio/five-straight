import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import gameApp from './reducer';
import { resetGame, clickCell } from './action';
import VisibleArena from './container/VisibleArena';
import Ai from './Ai';
import './index.css';

const INITIAL_BOARD_SIZE = 5;
const AI_DELAY = 500; // ms
const AI_PLAYER_NUMBER = 2;
const AI_BEHAVIOR = 'smart';
const REQUIRED_LENGTH = 5;

const ai = new Ai(AI_PLAYER_NUMBER, AI_BEHAVIOR, REQUIRED_LENGTH);

const store = createStore(gameApp);

const aiListener = () => {
  const state = store.getState();
  const player = state.turn % 2 === 0 ? 1 : 2;
  if (player === 2 && !state.playerWon) {
    setTimeout(() => {
      const move = ai.getNextMove(state.moves, state.size);
      store.dispatch(clickCell(move));
    }, AI_DELAY);
  }
}

store.subscribe(aiListener);
store.dispatch(resetGame(INITIAL_BOARD_SIZE));

const app = (
  <Provider store={store}>
    <VisibleArena />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
