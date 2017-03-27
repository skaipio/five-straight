var _ = require('lodash');

const REQUIRED_LENGTH = 5;

function Game(size) {
  this.board = _.map(_.range(size*size), () => 0);
  this.boardSize = size;
  this.turn = 0;
}

/**
Records the move, evaluates current situation (win or loss)
and returns the result with the player that made the move
and the evaluation.
**/
Game.prototype.move = function (x, y) {
  var player = this.turn % 2 === 0 ? 1 : 2;
  const result = {};
  const index = indexAt(this.boardSize, x, y);
  if (this.board[index] !== 0) {
    // Stop here if cell is already occupied
    player = 0;
  } else {
    // Increment turn only if move can be made
    this.turn++;
    this.board[index] = player;
    result.playerWon = this.evaluate(index, player);
  }
  result.turn = this.turn;
  result.player = player;
  return result;
};

/**
Checks every direction from the last move to see if there's a straight of five.
Returns true if there is, otherwise false.
**/
Game.prototype.evaluate = function(lastMove, player) {
  let evaluator = getEvaluator(this.board, this.boardSize, lastMove, player);
  let straight = evaluator({x: 1, y: 0});
  straight = straight || evaluator({x: -1, y: 0});
  straight = straight || evaluator({x: 0, y: 1});
  straight = straight || evaluator({x: 0, y: -1});
  straight = straight || evaluator({x: 1, y: 1});
  straight = straight || evaluator({x: -1, y: 1});
  straight = straight || evaluator({x: 1, y: -1});
  straight = straight || evaluator({x: -1, y: -1});
  return straight;
};

Game.prototype.reset = function () {
  this.board = _.map(_.range(this.boardSize*this.boardSize), () => 0);
  this.turn = 0;
};

function getPoint(size, index) {
  return {
    x: index % size,
    y: Math.floor(index / size)
  };
}

function getEvaluator(board, boardSize, lastMove, player) {
  return (increment) => hasStraight(board, boardSize, lastMove, player, increment);
}

function indexAt(size, x, y) {
  return size * y + x;
}

function hasStraight(board, boardSize, index, player, increment) {
  var point = getPoint(boardSize, index);
  return hasStraightHelper(board, boardSize, player, REQUIRED_LENGTH, point, increment);
}

function hasStraightHelper(board, boardSize, player, required, currentPoint, increment) {
  var index = indexAt(boardSize, currentPoint.x, currentPoint.y);
  var occupant = board[index];
  if (occupant === player) {
    if (required === 1) {
      return true;
    } else {
      var nextX = currentPoint.x + increment.x;
      var nextY = currentPoint.y + increment.y;
      if (nextX < boardSize && nextY < boardSize) {
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

export default Game;
