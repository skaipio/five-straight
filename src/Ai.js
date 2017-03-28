import _ from 'lodash';

function getStrategy(behavior) {
  switch(behavior) {
    case 'random':
    default:
      return getRandomMove.bind(this);
  }
}

// lastMove should be the one made previously by the other player
function getRandomMove(lastMove) {
  _.pull(this.freeMoves, lastMove);
  let nextMove = _.sample(this.freeMoves);
  _.pull(this.freeMoves, nextMove);
  return nextMove;
}

// behavior should be either 'random' or 'smart'
function Ai(behavior, board) {
  this.board = board;
  this.freeMoves = _.range(board.length);
  this.getNextMove = getStrategy.apply(this, [behavior]);
}

export default Ai;
