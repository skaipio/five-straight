import React, { Component } from 'react';
import BoardCell from './BoardCell';
import _ from 'lodash';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.createCell = this.createCell.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.tableBody = this.createBoard(this.props.initialSize);
  }

  createCell(e, i, boardSize) {
    const tableKey = 'col-' + i;
    const x = i % boardSize;
    const y = Math.floor(i / boardSize);
    const gameBoard = this;
    return <BoardCell key={tableKey}
      onClick={() => {
        return gameBoard.props.onCellClick(x, y);
      }} />;
  }

  createBoard(boardSize) {
    const createRow = (e, i) => <tr key={'row' + i}>{e}</tr>;
    const tableBody = _(_.range(boardSize*boardSize))
      .map((e, i) => this.createCell(e, i, boardSize))  // create the table cells
      .chunk(boardSize)   // split them to groups of <game.size>
      .map(createRow)     // create rows of the grouped table cells
      .value();
    return tableBody;
  }

  render() {
    return (
      <table className="Board">
        <tbody>
        {this.tableBody}
        </tbody>
      </table>
    );
  }
}

export default Board;
