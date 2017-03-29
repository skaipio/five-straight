import _ from 'lodash';
import BoardUtil from './BoardUtil';

function getStrategy(behavior) {
  switch(behavior) {
    case 'smart':
      return getSmartMove.bind(this);
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

// lastMove should be the one made previously by the other player
function getSmartMove(lastMove) {
  // Accumulates the score of a single ray
  const rayScoreAccumulator = (acc,boardIndex,i,coll) => {
    const occupant = this.board[boardIndex];
    const cellScore = occupant === 2 ? 1 : 0;
    acc.ai = (acc.ai || 0) + cellScore;
    return acc;
  };

  // sums the scores from each ray
  const rayScoreSummer = (rayEvaluations) =>
    _.sum(rayEvaluations.map((rayEvaluation) => rayEvaluation.evaluation.ai));

  const sunrayCaster = BoardUtil.rayCaster(5, rayScoreAccumulator, rayScoreSummer);

  const bestMove = _(this.board)
    // map to occupants
    .map((val, index) => ({
      occupant: val,
      index: index
    }))
    // consider only unoccupied ones, i.e. cells with 0
    .filter((val) => val.occupant === 0)
    .map((val, index, board) => {
      // get the score of rays casted from val.index
      const result = sunrayCaster(board, this.boardSize, val.index);
      return {index: val.index, score: result};
    }).maxBy('score');
    console.log('AI move', bestMove);
  return bestMove.index;
}

// behavior should be either 'random' or 'smart'
function Ai(behavior, board, boardSize) {
  this.board = board;
  this.boardSize = boardSize;
  this.freeMoves = _.range(board.length);
  this.getNextMove = getStrategy.apply(this, [behavior]);
}

export default Ai;
