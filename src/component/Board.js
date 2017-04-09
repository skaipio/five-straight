import React, { PropTypes } from 'react';
import BoardCell from './BoardCell';
import _ from 'lodash';
import './Board.css';

const Board = ({moves, size, onCellClick}) => {
  const createCell = (e, i) => {
    const tableKey = 'col-' + i;
    return <BoardCell key={tableKey} player={moves[i]} onClick={() => onCellClick(i)} />;
  }

  const createRow = (e, i) => <tr key={'row-' + i}>{e}</tr>;

  const board = _(moves).map(createCell)
    .chunk(size)
    .map(createRow)
    .value();

  return (
    <table className="Board">
      <tbody>
      {board}
      </tbody>
    </table>
  );
}

Board.propTypes = {
  moves: PropTypes.array,
  size: PropTypes.number.isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default Board;
