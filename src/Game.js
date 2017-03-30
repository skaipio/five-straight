import _ from 'lodash';
import Ai from './Ai';

// Required amount of pieces in a straight
const REQUIRED_LENGTH = 5;
const AI_BEHAVIOR = 'smart';
const AI_PLAYER_NUMBER = 2;

function Game(size) {
  // We could make a 2D board but iterating over all the cells
  // is easier when they're all consecutively in a single table
  this.board = _.map(_.range(size*size), () => 0);
  this.boardSize = size;
  this.turn = 0;
  this.ai = new Ai(AI_PLAYER_NUMBER, AI_BEHAVIOR, this.board, size, REQUIRED_LENGTH);
}

/**
Records the move, evaluates current situation (win or loss)
and returns the result with the player that made the move
and the evaluation.
**/
Game.prototype.move = function (index) {
  this.lastMove = index;
  var player = this.turn % 2 === 0 ? 1 : 2;
  const result = {};
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
Checks every direction from the last move to see if there's a straight of REQUIRED_LENGTH.
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
  this.ai = new Ai(AI_BEHAVIOR, this.board, this.boardSize);
};

Game.prototype.getAiMove = function() {
  return this.ai.getNextMove(this.lastMove);
}

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

export default Game;
