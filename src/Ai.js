import _ from 'lodash';
import BoardUtil from './BoardUtil';

const getFreeMoves = (board) => board
  .map((elem, index) => [elem, index])
  .filter(elemAndIndex => elemAndIndex[0] === 0)
  .map(elemAndIndex => elemAndIndex[1]);

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
function getRandomMove(board) {
  const freeMoves = getFreeMoves(board);
  return _.sample(freeMoves);
}

// lastMove should be the one made previously by the other player
function getSmartMove(board, boardSize) {
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
      const occupant = board[index];
      return occupant !== 0 && occupant !== this.aiPlayerNumber
    },
    rayScoreAccumulator,
    rayScoreSummer);

  const bestMove = _(board)
    // map to occupants
    .map((val, index) => ({
      occupant: val,
      index: index
    }))
    // consider only unoccupied ones, i.e. cells with 0
    .filter((val) => val.occupant === 0)
    .map((val, index) => {
      // get the score of rays casted from val.index
      const result = sunrayCaster(board, boardSize, val.index);
      return {index: val.index, score: result};
    }).maxBy('score');
    console.log('AI move', bestMove);
  return bestMove.index;
}

class Ai {
  // behavior should be either 'random' or 'smart'
  constructor(aiPlayerNumber, behavior, requiredStraight) {
    this.aiPlayerNumber = aiPlayerNumber
    this.requiredStraight = requiredStraight;
    this.getNextMove = getStrategy.apply(this, [behavior]);
  }
}

export default Ai;
