import _ from 'lodash';

const sumCoordinates = (c1, c2) => ({
    x: c1.x + c2.x,
    y: c1.y + c2.y
  });

const isInBounds = (coordinates, boardSize) => (
  _.inRange(coordinates.x, boardSize) && _.inRange(coordinates.y, boardSize));

const coordinatesFromIndex = (index, size) => ({
      x: index % size,
      y: Math.floor(index / size)
    });

// Converts index to 2d coordinates
// and returns the sum of the coordinates and the increment
const indexFromCoordinates = (coordinates, size) => (
  coordinates.y * size + coordinates.x);

/**
 * This ray won't progress any further if blockCondition is met.
 * It also stops at the board borders determined by boardSize.
 * blockCondition should take (board, index)
**/
function blockableRecursiveRay(
    start,  // start ray from here
    board,
    boardSize,
    increment,
    blockCondition,
    rayLength,
    doOnIndex) {
      //console.log('start', start);
  function recursiveRay(index) {
    let coordinates = coordinatesFromIndex(index, boardSize);
    let nextCoordinates = sumCoordinates(coordinates, increment);
    let nextIndex = indexFromCoordinates(nextCoordinates, boardSize);
    let inBounds = isInBounds(nextCoordinates, boardSize);
    let isBlocked = blockCondition(board, nextIndex);
    if (inBounds && !isBlocked) {
      let evaluation = recursiveRay(nextIndex);
      return doOnIndex(board, index, evaluation);
    } else {
      return doOnIndex(board, index);
    }
  }

  return recursiveRay(start);
}

function blockableRayCaster(rayLength, blockCondition, doOnIndex, doOnRayResults) {
  return (board, boardSize, from) => {
    let evaluator = (increment) => blockableRecursiveRay(
      from, board, boardSize, increment, blockCondition, rayLength, doOnIndex)
    const rayEvaluations = [];
    for (let x = -1; x < 2; ++x) {
      for (let y = -1; y < 2; ++y) {
        if (x === 0 && y === 0) continue;
        const increment = {x: x, y: y};
        rayEvaluations.push({
          evaluation: evaluator(increment),
          increment: increment
        });
      }
    }
    return doOnRayResults(rayEvaluations);
  }
}

function rayCaster(rayLength, doOnIndex, doOnRayResults) {
  return (board, boardSize, from) => {
    let evaluator = (increment) => _.reduce(
      getRayIndices(from, increment, boardSize, rayLength), // the board indices to process
      doOnIndex,  // method applied to each index given by getRayIndices
      {} // initial accumulator
    );
    const rayEvaluations = [];
    for (let x = -1; x < 2; ++x) {
      for (let y = -1; y < 2; ++y) {
        if (x === 0 && y === 0) continue;
        const increment = {x: x, y: y};
        rayEvaluations.push({
          evaluation: evaluator(increment),
          increment: increment
        });
      }
    }
    return doOnRayResults(rayEvaluations);
  }
}

/**
 * Returns a "ray" of indices for a 2D board starting at 'from'.
 * The direction is determined by 'increment'.
 * The ray won't go over the border of the board, determined by the size.
 * Not the most efficient method since it creates objects and arrays.
**/
function getRayIndices(from, increment, size, rayLength) {
  var fromCoordinate = coordinatesFromIndex(from, size);
  return _(_.range(rayLength)).map((i) => {
    var x = fromCoordinate.x + i * increment.x;
    var y = fromCoordinate.y + i * increment.y;
    return {x: x, y: y};
  }).takeWhile((coordinates) => isInBounds(coordinates, size))
  .map((coordinates) => indexFromCoordinates(coordinates, size))
  .value();
}

var BoardUtil = {
  blockableRayCaster: blockableRayCaster,
  rayCaster: rayCaster
};

export default BoardUtil;
