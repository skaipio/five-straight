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
  const rayScoreAccumulator = (board, index, previousEvaluation) => {
    previousEvaluation = previousEvaluation || {ai: 0};
    const occupant = board[index];
    // If the occupant is ai itself, give 2 points, if 0 i.e. empty, give 1 point, otherwise 0
    const cellScore = occupant === this.aiPlayerNumber ? 2 : (occupant === 0 ? 1 : 0);
    previousEvaluation.ai += cellScore;
    return previousEvaluation;
  };

  // sums the scores from each ray
  const rayScoreSummer = (rayEvaluations) =>
    _.sum(rayEvaluations.map((rayEvaluation) => rayEvaluation.evaluation.ai));

  const sunrayCaster = BoardUtil.blockableRayCaster(
    this.requiredStraight,
    // block condition, i.e. what is considered a blocking cell on board
    (board, index) => {
      let occupant = board[index];
      return occupant != 0 && occupant != this.aiPlayerNumber
    },
    rayScoreAccumulator,
    rayScoreSummer);

  const bestMove = _(this.board)
    // map to occupants
    .map((val, index) => ({
      occupant: val,
      index: index
    }))
    // consider only unoccupied ones, i.e. cells with 0
    .filter((val) => val.occupant === 0)
    .map((val, index) => {
      // get the score of rays casted from val.index
      const result = sunrayCaster(this.board, this.boardSize, val.index);
      return {index: val.index, score: result};
    }).maxBy('score');
    console.log('AI move', bestMove);
  return bestMove.index;
}

// behavior should be either 'random' or 'smart'
function Ai(aiPlayerNumber, behavior, board, boardSize, requiredStraight) {
  this.aiPlayerNumber = aiPlayerNumber
  this.board = board;
  this.boardSize = boardSize;
  this.requiredStraight = requiredStraight;
  this.freeMoves = _.range(board.length);
  this.getNextMove = getStrategy.apply(this, [behavior]);
}

export default Ai;
