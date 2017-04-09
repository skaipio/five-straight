import React from 'react';
import { connect } from 'react-redux';

const Display = ({playerWon}) => {
  if (playerWon) {
    return (<h2>Player {playerWon} has won!</h2>);
  }
  return null;
}

const mapStateToProps = (state) => ({
  playerWon: state.playerWon
});

const WinnerDisplay = connect(
  mapStateToProps
)(Display)

export default WinnerDisplay
