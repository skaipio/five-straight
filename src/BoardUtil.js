import _ from 'lodash';

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
  }).takeWhile((coordinates) => {
    return _.inRange(coordinates.x, size) && _.inRange(coordinates.y, size);
  }).map((coordinates) => indexFromCoordinates(coordinates, size))
  .value();
}

function coordinatesFromIndex(index, size) {
  return {
    x: index % size,
    y: Math.floor(index / size)
  };
}

// Converts index to 2d coordinates
// and returns the sum of the coordinates and the increment
function indexFromCoordinates(coordinates, size) {
  return coordinates.y * size + coordinates.x;
}

var BoardUtil = {
  rayCaster: rayCaster
};

export default BoardUtil;
