import React, {PropTypes} from 'react';

const getPlayerSymbol = (player) => {
  switch (player) {
    case 1:
      return 'X';
    case 2:
      return 'O';
    default:
      return '';
  }
}

const BoardCell = ({onClick, player}) => {
  const symbol = getPlayerSymbol(player);
  
  return (
    <td>
      <button onClick={onClick}>{symbol}</button>
    </td>
  );
}

BoardCell.propTypes = {
  onClick: PropTypes.func.isRequired,
  player: PropTypes.number
}

export default BoardCell;
