import _ from 'lodash';

// Required amount of pieces in a straight
const REQUIRED_LENGTH = 5;

const getPoint = (size, index) => ({
  x: index % size,
  y: Math.floor(index / size)
})

const indexAt = (size, x, y) => size * y + x;

const hasStraightHelper = (board, boardSize, player, required, currentPoint, increment) => {
  const index = indexAt(boardSize, currentPoint.x, currentPoint.y);
  const occupant = board[index];
  if (occupant === player) {
    if (required === 1) {
      return true;
    } else {
      var nextX = currentPoint.x + increment.x;
      var nextY = currentPoint.y + increment.y;
      if (_.inRange(nextX, boardSize) && _.inRange(nextY, boardSize)) {
        var nextPoint = {
          x: nextX,
          y: nextY
        };
        return hasStraightHelper(board, boardSize, player, --required, nextPoint, increment);
      }
    }
  }
  return false;
}

const hasStraight = (board, boardSize, index, player, increment) => {
  const point = getPoint(boardSize, index);
  return hasStraightHelper(board, boardSize, player, REQUIRED_LENGTH, point, increment);
}

const getEvaluator = (board, boardSize, lastMove, player) =>
  (increment) => hasStraight(board, boardSize, lastMove, player, increment);

class Game {
  /**
  Checks every direction from indexToCheck to see if there's a straight of REQUIRED_LENGTH.
  Returns true if there is, otherwise false.
  **/
  static hasStraightAtIndex(board, boardSize, indexToCheck, player) {
    const evaluator = getEvaluator(board, boardSize, indexToCheck, player);
    let straight = evaluator({x: 1, y: 0});
    straight = straight || evaluator({x: -1, y: 0});
    straight = straight || evaluator({x: 0, y: 1});
    straight = straight || evaluator({x: 0, y: -1});
    straight = straight || evaluator({x: 1, y: 1});
    straight = straight || evaluator({x: -1, y: 1});
    straight = straight || evaluator({x: 1, y: -1});
    straight = straight || evaluator({x: -1, y: -1});
    return straight;
  }
}

export default Game;
